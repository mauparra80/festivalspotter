// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
import crypto from 'crypto';


export const handler = async function(event, context) {
  console.log("Authorize user function called");

  const clientId = process.env.SPOTIFY_CLIENT_ID; //stored in netlify env
  const redirectUri = `${process.env.URL}/callback`;
  const verifier = generateCodeVerifier(128); //TODO: store verifier
  const challenge = await generateCodeChallenge(verifier);

  console.log("Redirect URI:", redirectUri);
  console.log("Verifier:", verifier);
  console.log("Challenge:", challenge);

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('response_type', 'code');
  params.append('redirect_uri', redirectUri);
  params.append('scope', 'user-library-read playlist-read-private playlist-read-collaborative'); //what we access from user
  params.append('code_challenge_method', 'S256');
  params.append('code_challenge', challenge);

  const redirectUrl = `https://accounts.spotify.com/authorize?${params.toString()}&verifier=${verifier}`;
  console.log("Redirect URL:", redirectUrl);

  return {
    statusCode: 200,
    body: JSON.stringify({
      redirectUrl: redirectUrl,
      verifier: verifier,
    })
  };
};

function generateCodeVerifier(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    hash.update(codeVerifier);
    const digest = hash.digest('base64');
    resolve(
      digest
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '')
    );
  });
}
