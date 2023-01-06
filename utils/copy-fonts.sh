#!/bin/bash
# SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)
#
# SPDX-License-Identifier: AGPL-3.0-only

set -e

echo "Delete old font directory"
rm -rf static/fonts

echo "Copy font lato"
mkdir -p static/fonts/lato
cp node_modules/@fontsource/lato/files/lato-latin-ext-400-normal.woff2 static/fonts/lato/lato-latin-ext-400-normal.woff2
cp node_modules/@fontsource/lato/files/lato-latin-400-normal.woff2 static/fonts/lato/lato-latin-400-normal.woff2
cp node_modules/@fontsource/lato/files/lato-all-400-normal.woff static/fonts/lato/lato-all-400-normal.woff

echo "Copy font kumbh"
mkdir -p static/fonts/kumbh-sans
cp node_modules/@fontsource/kumbh-sans/files/kumbh-sans-latin-ext-400-normal.woff2 static/fonts/kumbh-sans/kumbh-sans-latin-ext-400-normal.woff2
cp node_modules/@fontsource/kumbh-sans/files/kumbh-sans-all-400-normal.woff static/fonts/kumbh-sans/kumbh-sans-all-400-normal.woff
cp node_modules/@fontsource/kumbh-sans/files/kumbh-sans-latin-400-normal.woff2 static/fonts/kumbh-sans/kumbh-sans-latin-400-normal.woff2

echo "Copy font forkawesome"
mkdir -p static/fonts/forkawesome
cp -r node_modules/fork-awesome/fonts/* static/fonts/forkawesome

echo "All fonts copied"
