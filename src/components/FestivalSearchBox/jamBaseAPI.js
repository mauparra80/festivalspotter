//functions for the JamBase API

export default async function getJamBaseEvent(state) {
  
  try {
    const result = await fetch(`/.netlify/functions/jamBaseAPI?state=${state}`);
    const data = await result.json();
    console.log(data);

    return(data);
    
  } catch (error) {
    console.error('there was an error', error);
  }
}