/*
 SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)

 SPDX-License-Identifier: AGPL-3.0-only
*/

import fetch, { Response } from 'node-fetch';
import yaml from 'yaml';
import fs from 'fs/promises';

interface GitHubReleaseEntry {
  id: string
  name: string
  tag_name: string
  html_url: string
  tarball_url: string
  body: string
  assets: {
    name: string
    size: number,
    browser_download_url: string
  }[]
  created_at: string
  prerelease: boolean
  draft: boolean
}

interface QuayResponse {
  has_additional: boolean
  page: number
  tags: QuayImageTagEntry[]
}

interface QuayImageTagEntry {
  name: string
  reversion: boolean
  end_ts: number
  start_ts: number
  image_id: string
  last_modified: string
  expiration: string
  manifest_digest: string
  docker_image_id: string
  is_manifest_list: boolean
  size: number
}

async function fetchQuayResponses(): Promise<QuayResponse> {
  try {
    const response = await fetch('https://quay.io/api/v1/repository/hedgedoc/hedgedoc/tag/')
    return (await response.json()) as QuayResponse
  } catch (error) {
    console.error('Quay.io image list retrieval failed: ', error)
    process.exit(1)
  }
}

async function doGithubApiRequest(): Promise<unknown> {
  let response: Response;
  try {
    response = await fetch('https://api.github.com/repos/hedgedoc/hedgedoc/releases')
  } catch (error) {
    console.error("Can't connect to GitHub API", error);
    process.exit(1);
  }

  return response.json();
}

async function fetchHedgeDocReleases(): Promise<GitHubReleaseEntry[]> {
  const entries = (await doGithubApiRequest()) as GitHubReleaseEntry[];

  try {
    return entries
      .filter((entry: GitHubReleaseEntry) => !entry.prerelease && !entry.draft)
  } catch (error) {
    console.error("API response malformed", error);
    console.error("Response was: ", entries)
    process.exit(1);
  }
}

function groupByTagName(quayResponse: QuayResponse): Map<string, QuayImageTagEntry> {
  const dockerTags = new Map<string, QuayImageTagEntry>();
  quayResponse.tags.forEach(tagEntry => {
    dockerTags.set(tagEntry.name, tagEntry)
  })
  return dockerTags
}

async function writeReleaseMarkdownFile(groupedDockerTags: Map<string, QuayImageTagEntry>, entry: GitHubReleaseEntry) {
  const dockerTag = groupedDockerTags.get(entry.tag_name)

  const frontmatterJson = {
    Title: entry.name,
    date: entry.created_at,
    tarball: entry.tarball_url,
    legacyRelease: entry.name.includes('CodiMD'),
    docker: dockerTag
      ? {
        tag: dockerTag.name,
        size: dockerTag.size,
        alpineImageAvailable: groupedDockerTags.has(`${entry.tag_name}-alpine`)
      }
      : undefined
    ,
    assets: entry.assets.map(asset => {
      return {
        name: asset.name,
        url: asset.browser_download_url,
        size: asset.size
      }
    }),
    githubLink: entry.html_url
  };

  const content = `---
${yaml.stringify(frontmatterJson)}
---
${entry.body}`;

  const filename = `content/english/releases/${entry.tag_name}.md`;

  try {
    await fs.access(filename)
    console.log("file", filename, "already exists")
  } catch (error) {
    console.log('write file ', filename);
    await fs.writeFile(filename, content);
  }
}

async function writeAllReleaseMarkdownFiles(): Promise<void> {
  const quayResponse = await fetchQuayResponses();
  const groupedDockerTags = groupByTagName(quayResponse);
  const hedgedocReleases = await fetchHedgeDocReleases();

  hedgedocReleases
    .forEach(entry => writeReleaseMarkdownFile(groupedDockerTags, entry));
}

writeAllReleaseMarkdownFiles().catch(error => console.error(error))
