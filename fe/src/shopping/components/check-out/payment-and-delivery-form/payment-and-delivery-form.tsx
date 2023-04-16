import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import { DeliveryMethods, OrderFormModel, PaymentMethods } from '../../../../shared/models/order.model';
import classes from './payment-and-delivery-form.module.scss';

const PaymentAndDeliveryForm = () => {
    const {control} = useFormContext<OrderFormModel>();

    return (
        <div className={classes.component}>
            <Controller 
                control={control}
                name='deliveryMethod'
                render={({field, fieldState}) => {
                    return <FormControl>
                    <FormLabel>Szállítási mód</FormLabel>
                    <RadioGroup
                        onChange={field.onChange}
                        value={field.value}
                        row
                        aria-labelledby="deliveryMethod"
                        name="deliveryMethod"
                    >
                        {DeliveryMethods.map((dm, i) => <FormControlLabel key={i} value={dm.value} control={<Radio />} label={dm.displayValue} />)}
                    </RadioGroup>
                    <FormHelperText error={!!fieldState.error}>
                        {fieldState.error?.message}
                    </FormHelperText>
                </FormControl>}}
            />
            <Controller 
                control={control}
                name="paymentMethod"
                render={({field, fieldState}) => {
                    return <FormControl>
                    <FormLabel>Fizetési mód</FormLabel>
                    <RadioGroup
                        onChange={field.onChange}
                        value={field.value}
                        row
                        aria-labelledby="paymentMethod"
                        name="paymentMethod"
                    >
                        {PaymentMethods.map((pm, i) => <FormControlLabel key={i} value={pm.value} control={<Radio />} label={pm.displayValue} />)}
                    </RadioGroup>
                    <FormHelperText error={!!fieldState.error}>
                        {fieldState.error?.message}
                    </FormHelperText>
                </FormControl>}}
            />
        </div>
    )
}

export default PaymentAndDeliveryForm