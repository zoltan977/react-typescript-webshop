import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Autocomplete, FormGroup, FormHelperText, IconButton, InputAdornment, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { UserAccountData } from '../../../../auth/models/user-account.model';
import { getUserAccountData } from '../../../../auth/store/selectors';
import { OrderFormModel } from '../../../../shared/models/order.model';
import classes from './order-form.module.scss';

const OrderForm = () => {
    
    const userAccountData: UserAccountData = useSelector(getUserAccountData);
    const {control, setValue, trigger, formState: {errors}} = useFormContext<OrderFormModel>();

    return (
        <div className={classes.component}>
            <h1>Megrendelő adatai</h1>
            {
                !!errors.cart && <FormHelperText error={!!errors.cart}>
                    Nincs kosár!
                </FormHelperText>
            }
            {
                !!errors.userEmail && <FormHelperText error={!!errors.userEmail}>
                    Nem vagy belépve!
                </FormHelperText>
            }
            <FormGroup className={classes.group}>
                <Controller
                    render={({ field, fieldState }) => {
                        return <Autocomplete
                        freeSolo
                        options={userAccountData.customerNames.map(cn => cn.name)}
                        value={field.value}
                        onChange={(event: any, values: any) => {
                            field.onChange(values);
                        }}
                        renderInput={(params) => <TextField {...params}
                                    onChange={field.onChange}
                                    fullWidth
                                    variant={'filled'}
                                    label={'Számlázási név'}
                                    helperText={fieldState.error?.message}
                                    error={!!fieldState.error}
                                    type={'text'}
                                    InputProps={{
                                        ...params.InputProps,
                                        classes: {root: classes.input},
                                        endAdornment: <InputAdornment position="end">
                                        <IconButton
                                            aria-label="name"
                                            edge="end"
                                        >
                                            <AccountCircleIcon />
                                        </IconButton>
                                    </InputAdornment>
                                    }}
                                />}
                            />
                    }}
                    name={'name'}
                    control={control}
                />
                <Controller
                    render={({ field, fieldState }) => {
                        return <Autocomplete
                        freeSolo
                        options={userAccountData.deliveryAddresses.map(da => `${da.city} - ${da.address}`)}
                        value={field.value}
                        onChange={(event: any, values: any) => {
                            const index: number = values?.indexOf(" - ") || -1;
                            if (index !== -1) {
                                const address = values.slice(index + 3);
                                const city = values.slice(0, index);
                                if (city) {
                                    setValue("city", city);
                                    trigger('city');
                                }
                                field.onChange(address);
                            }
                        }}
                        renderInput={(params) => <TextField {...params}
                                    multiline
                                    minRows={5}
                                    onChange={field.onChange}
                                    fullWidth
                                    variant={'filled'}
                                    label={'Számlázási cím'}
                                    helperText={fieldState.error?.message}
                                    error={!!fieldState.error}
                                    type={'text'}
                                    InputProps={{
                                        ...params.InputProps,
                                        classes: {root: classes.input},
                                        endAdornment: <InputAdornment position="end">
                                        <IconButton
                                            aria-label="name"
                                            edge="end"
                                        >
                                            <AccountCircleIcon />
                                        </IconButton>
                                    </InputAdornment>
                                    }}
                                />}
                            />
                    }}
                    name={'address'}
                    control={control}
                />
                <Controller
                    render={({ field, fieldState }) => {
                        return <TextField
                                    onChange={field.onChange}
                                    value={field.value}
                                    fullWidth
                                    variant={'filled'}
                                    label={'Város'}
                                    helperText={fieldState.error?.message}
                                    error={!!fieldState.error}
                                    type={'text'}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                        <IconButton
                                            aria-label="name"
                                            edge="end"
                                        >
                                            <AccountCircleIcon />
                                        </IconButton>
                                    </InputAdornment>
                                    }}
                                />
                    }}
                    name={'city'}
                    control={control}
                />
            </FormGroup>
        </div>
  )
}

export default OrderForm