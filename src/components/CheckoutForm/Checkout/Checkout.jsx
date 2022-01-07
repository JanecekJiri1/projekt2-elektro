import React, { useState, useEffect } from "react";
import { Paper, Stepper, Step, StepLabel, Typography, Divider, Button, CssBaseline } from "@material-ui/core";
import { commerce } from "../../../lib/commerce.js";
import useStyles from "./style.js";
import AddressForm from "../AddressForm.jsx";
import PaymentForm from "../PaymentForm.jsx";
import { Link } from "react-router-dom";

const Checkout = ({ cart, order, onCaptureCheckout, error, handleEmptyCart }) => {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, { type: "cart" });

        setCheckoutToken(token);
      } catch (error) {}
    };

    generateToken();
  }, [cart]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData(data);

    nextStep();
  };

  const timeout = () => {
    setTimeout(() => {
      setIsFinished(true);
    }, 500);
  };
  let Confirmation = () =>
    isFinished && (
      <>
        <>
          <div>
            <Typography variant="h5">Thank you for your purchase</Typography>
            <Typography variant="subtitle2">Order ref: 1234 bv</Typography>
            <Divider className={classes.divider} />
          </div>
          <br />
          <Button component={Link} variant="outlined" type="button" to="/" onClick={handleEmptyCart}>
            Back to home
          </Button>
        </>
      </>
    );

  const steps = ["Shopping address", "Payment details"];
  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
        timeout={timeout}
      />
    );

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar}>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((step) => (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
          </Paper>
        </main>
      </div>
    </>
  );
};

export default Checkout;
