import React, {useEffect} from "react";

export default function Welcome() {

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
     <h1>Hello Welcome</h1>
    </>
  )
}

const fetchData = async () => {
  try {
    const response = await fetch('/.netlify/functions/fetch-data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};