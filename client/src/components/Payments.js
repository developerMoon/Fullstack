import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Payments extends Component {
  render() {
 
    return(
      <StripeCheckout 
        amount={500} //500cents = 5usd
        token={token => console.log(token)} //expects callback function from stripe
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      />
    );
  }
}

export default Payments;