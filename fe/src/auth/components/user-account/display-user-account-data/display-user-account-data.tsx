import { Card, CardContent, CardHeader, Fab } from '@mui/material';
import { useSelector } from 'react-redux';
import { getUserAccountData } from '../../../store/selectors';
import RemoveIcon from '@mui/icons-material/Remove';
import classes from './display-user-account-data.module.scss';
import { useDispatch } from 'react-redux';
import { authActions } from '../../../store/actions';

const DisplayUserAccountData = () => {
    const userAccountData = useSelector(getUserAccountData);
    const dispatch = useDispatch();

    const deleteCustomerName = (customerNameId: string) => {
        dispatch(authActions.deleteCustomerName(customerNameId))
    }
    
    const deleteDeliveryAddress = (deliveryAddressId: string) => {
        dispatch(authActions.deleteDeliveryAddress(deliveryAddressId))
    }

    return (
        <div className={classes.component}>
            <Card className={classes.card}>
                <CardHeader
                    title={'Számlázási nevek'}
                />
                <Card className={classes.card}>
                    {
                        userAccountData.customerNames.map((cn, i) => <CardContent key={i} className={classes.cardContent}>
                            <p>
                                {cn.name}
                            </p>
                            <Fab type='button' size="small" color="secondary" aria-label="add" onClick={() => {
                                    deleteCustomerName(cn._id!)
                                }}>
                                    <RemoveIcon />
                            </Fab>
                        </CardContent>)
                    }
                </Card>
                <CardHeader
                    title={'Számlázási címek'}
                />
                <Card className={classes.card}>
                    {
                        userAccountData.deliveryAddresses.map((da, i) => <CardContent key={i} className={classes.cardContent}>
                            <div>
                                <p>
                                    {da.address}
                                </p>
                                <p>
                                    {da.city}
                                </p>
                            </div>
                            <Fab type='button' size="small" color="secondary" aria-label="add" onClick={() => {
                                    deleteDeliveryAddress(da._id!)
                                }}>
                                    <RemoveIcon />
                            </Fab>
                        </CardContent>)
                    }
                </Card>
            </Card>
        </div>
    )
}

export default DisplayUserAccountData