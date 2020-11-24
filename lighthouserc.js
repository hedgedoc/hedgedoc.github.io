/*
 * SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:1313/'],
      startServerCommand: 'hugo server --minify --disableLiveReload',
    },
    upload: {
      target: 'lhci',
      serverBaseUrl: 'https://lighthouse.hedgedoc.org',
      token: process.env.LHCI_SERVER_ACCESSKEY,
    },
  },
};
