// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2

import https from 'https';
import querystring from 'querystring';

export const handler = async function(event, context) {
  console.log("we are in getToken function now");
  console.log('this is the event passed into getTokensAPI', event);

  const code = new URLSearchParams(event.queryStringParameters).get('code');
  const verifier = new URLSearchParams(event.queryStringParameters).get('verifier');

  if (!code || !verifier) {
    console.error('Missing code or verifier in query parameters.');
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing code or verifier in query parameters.' }),
    };
  }

  const redirectUri = `${process.env.URL}/callback`;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const params = querystring.stringify({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
    code_verifier: verifier,
    client_id: clientId,
  });

  const authHeader = 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64');
  const options = {
    hostname: 'accounts.spotify.com',
    path: '/api/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': authHeader,
    },
  };

  console.log("Params:", params);
  console.log("Headers:", options.headers);

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode !== 200) {
          console.error(`HTTP error! status: ${res.statusCode}`);
          return reject({
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to exchange code for token", details: `HTTP error! status: ${res.statusCode}` }),
          });
        }

        try {
          const responseData = JSON.parse(data);
          if (responseData.error) {
            console.error(`API error: ${responseData.error} - ${responseData.error_description}`);
            return reject({
              statusCode: 500,
              body: JSON.stringify({ error: "Failed to exchange code for token", details: `API error: ${responseData.error} - ${responseData.error_description}` }),
            });
          }

          resolve({
            statusCode: 200,
            body: JSON.stringify({
              access_token: responseData.access_token,
              refresh_token: responseData.refresh_token,
            }),
          });
        } catch (e) {
          console.error(`Invalid JSON response: ${data}`);
          return reject({
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to exchange code for token", details: "Invalid JSON response from server" }),
          });
        }
      });
    });

    req.on('error', (e) => {
      console.error(`Problem with request: ${e.message}`);
      reject({
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to exchange code for token", details: e.message }),
      });
    });

    req.write(params);
    req.end();
  });
};