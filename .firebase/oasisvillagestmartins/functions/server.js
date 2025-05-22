const { onRequest } = require('firebase-functions/v2/https');
  const server = import('firebase-frameworks');
  exports.ssroasisvillagestmartin = onRequest({"region":"us-central1","secretEnvironmentVariables":[{"key":"GMAIL_APP_PASSWORD","secret":"GMAIL_APP_PASSWORD"}]}, (req, res) => server.then(it => it.handle(req, res)));
  