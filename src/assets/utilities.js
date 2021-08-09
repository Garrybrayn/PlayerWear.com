

jQuery(function () {




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
