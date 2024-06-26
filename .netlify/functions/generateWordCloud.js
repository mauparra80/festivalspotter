import axios from 'axios';

export const handler = async function(event,handler) {
  const options = {
    method: 'POST',
    url: 'https://textvis-word-cloud-v1.p.rapidapi.com/v1/textToCloud',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '86135b698cmshe47473a63834e96p1154f9jsn10a9a5a62584',
      'X-RapidAPI-Host': 'textvis-word-cloud-v1.p.rapidapi.com'
    },
    data: {
      text: 'This is a test. I repeat, this is a test. We are only testing the functionality of this api, nothing else. End of test.',
      scale: 0.5,
      width: 400,
      height: 400,
      colors: [
        '#375E97',
        '#FB6542',
        '#FFBB00',
        '#3F681C'
      ],
      font: 'Tahoma',
      use_stopwords: true,
      language: 'en',
      uppercase: false
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return {
      statusCode: 200,
      body: response.data,
    }

  } catch (error) {
    return {
      statusCode: 500, 
      body: JSON.stringify({error: 'Failed to fetch data from JamBase API'}),
    }
  }
}


