import { GlobalStateInterface } from '../../store/GlobalStateInterface';
import { UserAccountData } from '../models/user-account.model';

export const getUserAccountData = (state: GlobalStateInterface): UserAccountData => state.auth.userAccountData;

