import React, { useEffect } from 'react';

const BuyMeACoffeeButton = () => {
  useEffect(() => {
    const container = document.getElementById('bmc-button-container');

    if (!container) {
      return;
    }

    container.innerHTML = `
      <a class="bmc-button" href="https://www.buymeacoffee.com/mauparra" target="_blank">
        <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;">
      </a>
    `;

    // If you need to use the script, ensure it is added after setting the innerHTML
    const script = document.createElement('script');
    script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js';
    script.async = true;
    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return <div id="bmc-button-container"></div>;
};

export default BuyMeACoffeeButton;