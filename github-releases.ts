/*
 SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)

 SPDX-License-Identifier: AGPL-3.0-only
*/

import fetch from 'node-fetch';
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

export const githubReleases = async () => {
  fetch('https://quay.io/api/v1/repository/hedgedoc/hedgedoc/tag/')
    .then(res => res.json())
    .then((quayJson: QuayResponse) => {
      const dockerTags = new Map<string, QuayImageTagEntry>()
      quayJson.tags.forEach(tagEntry => {
        dockerTags.set(tagEntry.name, tagEntry)
      })
      fetch('https://api.github.com/repos/hedgedoc/hedgedoc/releases')
        .then(res => res.json())
        .then((githubJson: GitHubReleaseEntry[]) => {
          githubJson = githubJson.filter((entry: GitHubReleaseEntry) => !entry.prerelease && !entry.draft)

          githubJson.forEach(entry => {
            const dockerTag = dockerTags.get(entry.tag_name)

            const frontmatterJson = {
              Title: entry.name,
              date: entry.created_at,
              tarball: entry.tarball_url,
              docker: dockerTag
                ? {
                  tag: dockerTag.name,
                  size: dockerTag.size,
                  alpine: dockerTags.has(`${entry.tag_name}-alpine`)
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

            fs.access(filename).catch(() => {
              console.log('write file ', filename);
              fs.writeFile(filename, content);
            });
          });
        })
        .catch(err => {
          console.error("Can't connect to GitHub API: ", err);
          process.exit(1);
        });
    })
    .catch(err => {
      console.error('Quay.io image list retrieval failed: ', err)
      process.exit(1)
    })
};
