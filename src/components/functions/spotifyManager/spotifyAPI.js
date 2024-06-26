

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
    localStorage.setItem('verifier', data.verifier);
    console.log("verifier", data.verifier);
    setTimeout(() => {
      window.location.href = data.redirectUrl;
    }, 10000); // Adding a small delay to ensure localStorage operation completes
    window.location.href = data.redirectUrl; 
  } catch (error) {
    console.error('Error fetching data:', error);
  } 
};

export { authorizeSpotifyUser}