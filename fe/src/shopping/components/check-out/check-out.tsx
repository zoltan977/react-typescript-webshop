import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { getCurrentUser } from '../../../auth/services/auth.service';
import DisplayCart from '../../../shared/components/display-cart/display-cart';
import { routes } from '../../../shared/constants/routes';
import { OrderFormModel } from '../../../shared/models/order.model';
import { add as addOrder } from '../../../shared/services/order.service';
import { handleFormErrors } from '../../../shared/utils/handleFormErrors';
import history from '../../../shared/utils/history';
import { shoppingActions } from '../../store/actions';
import { getShoppingCart } from '../../store/selectors';
import classes from './check-out.module.scss';
import OrderForm from './order-form/order-form';
import PaymentAndDeliveryForm from './payment-and-delivery-form/payment-and-delivery-form';
import StepperButtons from './stepper-buttons/stepper-buttons';
import StepperLabels from './stepper-labels/stepper-labels';

const stepLabels = ['Mgrendelő adatai', 'Szállítás és fizetés', 'Megrendelés'];

const CheckOut = () => {
  const dispatch = useDispatch()
  const shoppingCart = useSelector(getShoppingCart);
  const resolver = classValidatorResolver(OrderFormModel);
  const methods = useForm<OrderFormModel>({
    defaultValues: new OrderFormModel(),
    resolver,
    mode: 'onChange'
  });
  const { handleSubmit, formState: {errors}, setValue, setError, reset, trigger } = methods;
  const [activeStep, setActiveStep] = useState(0);
  const isStepFailed: Record<number, boolean> = {
    0: !!errors.name || !!errors.address || !!errors.city || !!errors.cart || !!errors.userEmail,
    1: !!errors.deliveryMethod || !!errors.paymentMethod,
    2: false
  }
  const [catchFormErrors, setCatchFormErrors] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const populateEmailAndCartFields = () => {
    const currentUser = getCurrentUser();
    setValue("userEmail", currentUser?.user.email || "");
    setValue("cart", shoppingCart);
    trigger();
  }

  const handleReset = () => {
    reset(new OrderFormModel());
    populateEmailAndCartFields();
    setActiveStep(0);
  };

  const submitOrder = async (formData: OrderFormModel) => {
    console.log("formData: ", formData);

    try {
      await addOrder(formData)
      dispatch(shoppingActions.clearShoppingCart())
      toast.success("Sikeres rendelés!")
      history.push(routes.myOrders)
    } catch (error) {
      setCatchFormErrors(true);
      handleFormErrors(error, setError);
    }
  }


  useEffect(() => {
      if (catchFormErrors) {
        const indexOfStepWithError = Object.values(isStepFailed).findIndex(s => s);
        if (indexOfStepWithError !== -1) {
          setActiveStep(indexOfStepWithError);
        }
        setCatchFormErrors(false);
      }
  }, [isStepFailed, catchFormErrors])

  useEffect(() => {
    if (activeStep === stepLabels.length) {
      handleSubmit(submitOrder)();
    }
  }, [activeStep])
  
  useEffect(() => {
    populateEmailAndCartFields()
  }, [shoppingCart])
  

  return (<div className={classes.component}>
      <StepperLabels props={{activeStep, isStepFailed, stepLabels}} />
      <FormProvider {...methods}>
        <form style={{left: `${activeStep * (-100)}vw`}}>
          <div className={classes.step1} style={activeStep !== 0 ? {height: 0} : {}}>
            <div className={classes.core}>
              <OrderForm />
              <DisplayCart />
            </div>
            <StepperButtons props={{activeStep, handleBack, handleNext, stepLabels, isStepFailed}}/>
          </div>
          <div className={classes.step2} style={activeStep !== 1 ? {height: 0} : {}}>
            <PaymentAndDeliveryForm/>
            <StepperButtons props={{activeStep, handleBack, handleNext, stepLabels, isStepFailed}}/>
          </div>
          <div className={classes.step3} style={activeStep !== 2 ? {height: 0} : {}}>
            <Typography sx={{ mt: 2, mb: 1 }}>
              Ha minden OK küldd el!
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
            <StepperButtons props={{activeStep, handleBack, handleNext, stepLabels, isStepFailed}}/>
          </div>
        </form>
      </FormProvider>
  </div>
  );
}

export default CheckOut;