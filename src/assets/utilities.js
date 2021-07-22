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
              if (totalPriceElement) {
                const total = Number(totalPriceElement.innerText.replace('$', ''));
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



jQuery(function () {

  // MINICART STUFF
  setTimeout(function () {

    // Redirect to checkout when a product is added
    const cartItemCountElement = document.getElementById('booster__popup--holder'); // add to cart success notification container
    cartItemCountElement.addEventListener("DOMSubtreeModified", function (event) {
        window.location.href = '/pages/pre-checkout';
    }, false);


    // Load shipping details when it's been clicked
    document.querySelector('.minicart__button.minicart__button--shopping-cart')
      .addEventListener('click',
        function () {
          displayEstimatedShipping(
            document.querySelector('.minicart__total #chimping')
          );
        }
      )
  }, 5000);


  jQuery('.minicart__button--shopping-cart').on('submit', '#create_customer', e => {
    e.preventDefault();

    const formElement = jQuery(e.target);
    const newRandomPassword = Array.from({ length : 10 }, () => Math.random().toString(36)[2]).join('');
    const accountCreationData = `${formElement.serialize()}&customer[password]=${newRandomPassword}`;

    jQuery
      .post('/account', accountCreationData)
      .done(data => {

        const logErrors = String(jQuery(data).find('.errors').text());

        if (logErrors != "" && logErrors != 'undefined') {
          if(logErrors.includes('reset')){
            // The user already has an account.
            // Let them choose the checkout style
            document.location.href = '/pages/choose-checkout';
          }else{
            formElement.find('.errors').show().html(logErrors)
          }
        } else {
          // A new user was created.
          // Begin the checkout process.
          document.location.href = '/pages/pre-checkout';
        }
      })
      .fail(function () {
        console.log('error');
      });
    return false;
  });





});
