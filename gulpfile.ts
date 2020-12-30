/*
 SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)

 SPDX-License-Identifier: AGPL-3.0-only
*/

import gulp from 'gulp'

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

gulp.task("default", gulp.parallel("copy:font:lato", "copy:font:kumbh-sans", "copy:font:fork-awesome"))