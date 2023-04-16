import AddUserAccountItemForm from './add-user-account-item-form/add-user-account-item-form';
import DisplayUserAccountData from './display-user-account-data/display-user-account-data';
import classes from './user-account.module.scss';

const UserAccount = () => {
  return (
    <div className={classes.component}>
        <AddUserAccountItemForm/>
        <DisplayUserAccountData/>
    </div>
  )
}

export default UserAccount