import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RemoveIcon from '@mui/icons-material/Remove';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Fab,
    FilledInput,
    FormControl,
    FormGroup,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
} from '@mui/material';
import { useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { UserAccountData } from '../../../models/user-account.model';
import { getCurrentUser } from '../../../services/auth.service';
import { authActions } from '../../../store/actions';
import classes from './add-user-account-item-form.module.scss';

const AddUserAccountItemForm = () => {
    const dispatch = useDispatch();

    const resolver = classValidatorResolver(UserAccountData);

    const {control, handleSubmit, formState, setValue, setError, reset, watch, trigger} = useForm<UserAccountData>({
        mode: 'onChange',
        resolver,
        defaultValues: new UserAccountData()
    });
    const customerNamesFieldMethods = useFieldArray({
        control,
        name: 'customerNames'
    });
    const deliveryAddressesFieldMethods = useFieldArray({
        control,
        name: 'deliveryAddresses'
    });

    const customerNames = watch("customerNames")
    const deliveryAddresses = watch("deliveryAddresses")
    
    const populateEmail = () => {
        const currentUser = getCurrentUser()
        setValue("userEmail", currentUser?.user.email || "")
        trigger("userEmail");
    }
    
    const resetForm = () => {
        reset(new UserAccountData());
        populateEmail();
    }

    const send = (formData: UserAccountData) => {
        console.log("user account form data: ", formData)

        dispatch(authActions.addUserAccountData(formData, setError, resetForm));
    }

    useEffect(() => {
        populateEmail();
    }, [])
    
    return (
        <div className={classes.component}>
            <form onSubmit={handleSubmit(send)}>
                <Card className={classes.card}>
                    <FormHelperText error={!!formState.errors.customerNames}>
                        {formState.errors.customerNames?.message}
                    </FormHelperText>
                    {
                        customerNamesFieldMethods.fields.map(({id, name}, index: number) => <CardContent key={id} className={classes.cardContent}>
                            <FormGroup className={classes.group}>
                                <Controller
                                    defaultValue={name}
                                    render={({ field, fieldState }) => {
                                        return <FormControl variant="filled" className={classes.input}>
                                        <InputLabel error={!!fieldState.error} htmlFor={`customerNames.${index}.name`}>
                                            Számlázási név
                                        </InputLabel>
                                        <FilledInput
                                            error={!!fieldState.error}
                                            id={`customerNames.${index}.name`}
                                            value={field.value}
                                            onChange={field.onChange}  
                                            type={'text'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="name"
                                                        edge="end"
                                                    >
                                                        <AccountCircleIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        <FormHelperText error={!!fieldState.error}>
                                            {fieldState.error?.message}
                                        </FormHelperText>
                                    </FormControl>
                                    }}
                                    name={`customerNames.${index}.name`}
                                    control={control}
                                />
                                <FormHelperText error={!!(formState.errors.customerNames || [])[index]}>
                                    {(formState.errors.customerNames || [])[index]?.message}
                                </FormHelperText>
                            </FormGroup>
                            <Fab type='button' size="small" color="secondary" aria-label="add" onClick={() => {
                                customerNamesFieldMethods.remove(index)
                            }}>
                                <RemoveIcon />
                            </Fab>
                        </CardContent>)
                    }
                    <CardActions>
                        <Fab type='button' size="small" color="secondary" aria-label="add" onClick={() => {
                            customerNamesFieldMethods.append({name: ''})
                        }}>
                            <AddIcon />
                        </Fab>
                    </CardActions>
                </Card>
                <Card className={classes.card}>
                    <FormHelperText error={!!formState.errors.deliveryAddresses}>
                        {formState.errors.deliveryAddresses?.message}
                    </FormHelperText>
                    {
                        deliveryAddressesFieldMethods.fields.map(({id, address, city}, index: number) => <CardContent key={id} className={classes.cardContent}>
                            <FormGroup className={classes.group}>
                                <Controller
                                    defaultValue={address}
                                    render={({ field, fieldState }) => {
                                        return <FormControl variant="filled" className={classes.input}>
                                        <InputLabel error={!!fieldState.error} htmlFor={`deliveryAddresses.${index}.address`}>
                                            Szállítási cím
                                        </InputLabel>
                                        <FilledInput
                                            multiline
                                            minRows={5}
                                            error={!!fieldState.error}
                                            id={`deliveryAddresses.${index}.address`}
                                            value={field.value}
                                            onChange={field.onChange}  
                                            type={'text'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="address"
                                                        edge="end"
                                                    >
                                                        <LocationOnIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        <FormHelperText error={!!fieldState.error}>
                                            {fieldState.error?.message}
                                        </FormHelperText>
                                    </FormControl>
                                    }}
                                    name={`deliveryAddresses.${index}.address`}
                                    control={control}
                                />
                                <Controller
                                    defaultValue={city}
                                    render={({ field, fieldState }) => {
                                        return <FormControl variant="filled" className={classes.input}>
                                        <InputLabel error={!!fieldState.error} htmlFor={`deliveryAddresses.${index}.city`}>
                                            Város
                                        </InputLabel>
                                        <FilledInput
                                            error={!!fieldState.error}
                                            id={`deliveryAddresses.${index}.city`}
                                            value={field.value}
                                            onChange={field.onChange}  
                                            type={'text'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="city"
                                                        edge="end"
                                                    >
                                                        <LocationCityIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        <FormHelperText error={!!fieldState.error}>
                                            {fieldState.error?.message}
                                        </FormHelperText>
                                        </FormControl>
                                    }}
                                name={`deliveryAddresses.${index}.city`}
                                control={control}
                                />
                                <FormHelperText error={!!(formState.errors.deliveryAddresses || [])[index]}>
                                    {(formState.errors.deliveryAddresses || [])[index]?.message}
                                </FormHelperText>
                            </FormGroup>
                            <Fab type='button' size="small" color="secondary" aria-label="add" onClick={() => {
                                deliveryAddressesFieldMethods.remove(index)
                            }}>
                                <RemoveIcon />
                            </Fab>
                        </CardContent>)
                    }
                    <CardActions>
                        <Fab type='button' size="small" color="secondary" aria-label="add" onClick={() => {
                            deliveryAddressesFieldMethods.append({address: '', city: ''})
                        }}>
                            <AddIcon />
                        </Fab>
                    </CardActions>
                </Card>
                <span onClick={() => trigger()}>
                    <Button 
                        disabled={!formState.isValid || !customerNames || !deliveryAddresses || (!customerNames.length && !deliveryAddresses.length)} 
                        variant='contained'
                        type="submit">
                            Hozzáad
                    </Button>
                </span>
            </form>
        </div>
    )
}

export default AddUserAccountItemForm