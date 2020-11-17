module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:1313/'],
      startServerCommand: 'hugo server --minify --disableLiveReload',
    },
    upload: {
      target: 'lhci',
      serverBaseUrl: 'https://lighthouse.hedgedoc.net',
      token: process.env.LHCI_SERVER_ACCESSKEY,
    },
  },
};
