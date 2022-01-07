import React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import { Elements, CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Review from "./Review";

const stripePromise = loadStripe("...");

const PaymentForm = ({ checkoutToken, backStep, onCaptureCheckout, nextStep, timeout }) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!elements) return;

    // const cardElement = elements.getElement(CardElement);

    // const { error, paymentMethod } = await stripe.createPaymentMethod({ type: "card", card: cardElement });

    onCaptureCheckout(checkoutToken.id);
    timeout();
    nextStep();
  };
  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            //170
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br />
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={backStep}>
                  Back
                </Button>
                <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                  Pay {checkoutToken.live.subtotal.raw}CZK
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
