import fetch from "node-fetch";

export const handler = async function(event, context) {
  const API_KEY = '8dab9ba8-dc80-4e86-a994-093333438a8a';
  const state = event.queryStringParameters.state;
  let url = `https://www.jambase.com/jb-api/v1/events?eventType=festivals&geoStateIso=${state}&apikey=${API_KEY}`;
  const festivals = [];

  try {
    while (url) {
      const response = await fetch(url);
      const data = await response.json();
      festivals.push(...data.events);
      url = data.pagination.nextPage;
      console.log(url);
    }
    

    return {
      statusCode: 200,
      body: JSON.stringify(festivals),
    }
  } catch (error) {
    return {
      statusCode: 500, 
      body: JSON.stringify({error: 'Failed to fetch data from JamBase API'}),
    }
  }
}