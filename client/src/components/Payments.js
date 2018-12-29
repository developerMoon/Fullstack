import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Payments extends Component {
  render() {
 
    return(
      <StripeCheckout 
        name="Emaily"
        description="$5 for 5 email credits"
        amount={500} //500cents = 5usd
        token={token => console.log(token)} //expects callback function from stripe
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">
          Add Credits
        </button>
      </StripeCheckout>
    );
  }
}

export default Payments;