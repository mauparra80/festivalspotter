

const authorizeSpotifyUser = async () => {
  console.log('Starting authorizeSpotifyUser function');
  try {
    console.log('Fetching /.netlify/functions/authorizeUser');
    const response = await fetch('/.netlify/functions/authorizeUser');
    console.log('Response received');
    if (!response.ok) {
      console.error('Network response was not ok')
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('YEY!! we got the data! ',data);
    try {
      localStorage.setItem('verifier', data.verifier);
      sessionStorage.setItem('verifier', data.verifier); // Also store in sessionStorage
      console.log("Verifier stored in localStorage and sessionStorage:", data.verifier);
    } catch (storageError) {
      console.error('Error storing verifier in localStorage or sessionStorage:', storageError);
    }
    console.log("verifier", data.verifier);
    window.location.href = data.redirectUrl; 
  } catch (error) {
    console.error('Error fetching data:', error);
  } 
};

export { authorizeSpotifyUser}