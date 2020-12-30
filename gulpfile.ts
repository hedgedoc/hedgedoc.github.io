/*
 SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)

 SPDX-License-Identifier: AGPL-3.0-only
*/

import gulp from 'gulp'
import https from 'https'
import fs from 'fs/promises'

gulp.task("copy:font:lato", async () => {
  gulp.src([
    './node_modules/@fontsource/lato/files/lato-latin-ext-400-normal.woff2',
    './node_modules/@fontsource/lato/files/lato-latin-400-normal.woff2',
    './node_modules/@fontsource/lato/files/lato-all-400-normal.woff'
  ]).pipe(gulp.dest('./static/fonts/lato'))
});

gulp.task("copy:font:kumbh-sans", async () => {
  gulp.src([
    './node_modules/@fontsource/kumbh-sans/files/kumbh-sans-latin-ext-400-normal.woff2',
    './node_modules/@fontsource/kumbh-sans/files/kumbh-sans-all-400-normal.woff',
    './node_modules/@fontsource/kumbh-sans/files/kumbh-sans-latin-400-normal.woff2'
  ]).pipe(gulp.dest('./static/fonts/kumbh-sans'))
});

gulp.task("copy:font:fork-awesome", async () => {
  gulp.src('./node_modules/fork-awesome/fonts/*').pipe(gulp.dest('./static/fonts/forkawesome'))
});

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

gulp.task("github-releases", async () => {

  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0'
    }
  }

  https.get(' https://api.github.com/repos/hedgedoc/hedgedoc/releases', options, (response: { on: (arg0: string, arg1: (chunk: string) => void) => void; }) => {
    let data = '';

    // A chunk of data has been recieved.
    response.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    response.on('end', () => {
      let apiResult: GitHubReleaseEntry[] = JSON.parse(data)
        .filter((entry: GitHubReleaseEntry) => !entry.prerelease && !entry.draft)

      // bring releases in order
      //apiResult = apiResult.sort((a: GitHubReleaseEntry, b: GitHubReleaseEntry) => semver.gte(a.tag_name, b.tag_name) ? -1 : 1);

      apiResult.forEach(entry => {
        const content = `---
Title: ${entry.name}
date: ${entry.created_at}
tarball: ${entry.tarball_url}
assets: [{${entry.assets.map(asset => `name: ${asset.name}, url: ${asset.browser_download_url}, size: ${asset.size}`).join('}, {')}}]
githubLink: ${entry.html_url}
---
${entry.body}`;

        const filename = `content/english/releases/${entry.tag_name}.md`;

        fs.access(filename).catch(() => {
          console.log("write file ", filename);
          fs.writeFile(filename, content);
        });
      });
    });

  }).on("error", (error: Error) => {
    console.log("Error: " + error.message);
  });
});

gulp.task("default", gulp.parallel("copy:font:lato", "copy:font:kumbh-sans", "copy:font:fork-awesome", "github-releases"))
