function displayEstimatedShipping(shippingPriceElement, totalPriceElement) {
  if (shippingPriceElement) {
    fetch('/cart/shipping_rates.json?shipping_address[zip]=33759&shipping_address[country]=United%20States&shipping_address[province]=Florida')
      .then(data => {
        data.json().then(result => {
          if (result && result.shipping_rates && result.shipping_rates[0]) {
            if (Number(result.shipping_rates[0].price) === 0) {
              shippingPriceElement.innerHTML = '<b>FREE</b>';
            } else {
              shippingPriceElement.innerText = '$' + result.shipping_rates[0].price;
              if(totalPriceElement){
                const total = Number(totalPriceElement.innerText.replace('$',''));
                const totalIncludingShipping = total + Number(result.shipping_rates[0].price);
                if (totalPriceElement) {
                  // update the total price here.
                  totalPriceElement.innerText = '$' + totalIncludingShipping.toFixed(2);
                }
              }
            }
          } else {
            shippingPriceElement.innerText = 'Calculated on next step';
          }
        })
      })
  }
}
setTimeout(function(){
  document.querySelector('.minicart__button.minicart__button--shopping-cart')
    .addEventListener('click',
      function(){
        displayEstimatedShipping(
          document.querySelector('.minicart__total #chimping')
        );
      }
    )
}, 5000);
