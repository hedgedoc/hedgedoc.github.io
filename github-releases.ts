import fetch from 'node-fetch';
import yaml from "yaml";
import fs from "fs/promises";

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

export const githubReleases = async () => {
  fetch('https://api.github.com/repos/hedgedoc/hedgedoc/releases')
    .then(res => res.json())
    .then((json: GitHubReleaseEntry[]) => {
      json = json.filter((entry: GitHubReleaseEntry) => !entry.prerelease && !entry.draft)

      json.forEach(entry => {
        const frontmatterJson = {
          Title: entry.name,
          date: entry.created_at,
          tarball: entry.tarball_url,
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
          console.log("write file ", filename);
          fs.writeFile(filename, content);
        });
      });
    });
};
