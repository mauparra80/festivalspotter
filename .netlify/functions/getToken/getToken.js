// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2

//exchange code for token
// import fetch from "node-fetch";
import axios from "axios";

export const handler = async function(event, context) {


  //get code and verifier from the event query
  console.log("we are in getToken function now");
  console.log('this is the event passed into getTokensAPI', event);
  const code = new URLSearchParams(event.queryStringParameters).get('code');
  const verifier = new URLSearchParams(event.queryStringParameters).get('verifier');

  const redirect_Uri = `${process.env.URL}/callback`;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  // const clientSecret = process.env.SPOTIFY_CLIENT_SECRET; 

  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', redirect_Uri);
  params.append('code_verifier', verifier);
  params.append('client_id', clientId);

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  try {
    const response = await axios.post(tokenUrl, params.toString(), { headers });

    if (response.status !== 200) {
      throw new Error('HTTP error! status: ', response.status);
    }

    const data = response.data;
    if(data.error) {
      throw new Error(`API error: ${data.error} - ${data.error_description}`);
    }

    //Redirect back to frontend with token
    return {
      statusCode: 200,
      body: JSON.stringify({
        access_token: data.access_token,
        refresh_token: data.refresh_token
      }),
    };
  } catch (error) {
    console.error("Error exchanging code for token: ", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({error: "Failed to exchanged code for oken", details: error.message}),
    };
  }
};



