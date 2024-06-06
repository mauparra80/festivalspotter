/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'login-background': "url('./src/assets/img/loginBackground.webp')"
      },
      colors: {
        customSpotifyGreen: '#1DB954',
        customBlack: '#191414',
        customOffWhite: '#f2f2f2',
        customGunmetal: '#202D36',
        customLightTan: '#D4D6B9',
        customTan: '#D1CAA1',
        customBlue: '#59A5D8',
        customRed: '#DB5461',
      }
    },
  },
  plugins: [],
}

// --color-spotify-green: #1DB954;
// --color-black: #191414;
// --color-offWhite: #f2f2f2;
// --color-gunmetal: #202D36;
// --color-lightTan: #D4D6B9;
// --color-Tan: #D1CAA1;
// --color-blue: #59A5D8;
// --color-red: #DB5461;

