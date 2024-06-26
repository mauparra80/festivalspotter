

const authorizeSpotifyUser = async () => {
  try {
    const response = await fetch('/.netlify/functions/authorizeUser');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('YEY!! we got the data! ',data);
    localStorage.setItem('verifier', data.verifier);
    console.log("verifier", data.verifier);
    setTimeout(() => {
      window.location.href = data.redirectUrl;
    }, 100); // Adding a small delay to ensure localStorage operation completes
    window.location.href = data.redirectUrl; 
  } catch (error) {
    console.error('Error fetching data:', error);
  } 
};

export { authorizeSpotifyUser}