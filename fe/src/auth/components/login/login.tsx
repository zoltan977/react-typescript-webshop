import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import {
  Button,
  FilledInput,
  FormControl,
  FormGroup,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { routes } from '../../../shared/constants/routes';

import { AppError } from '../../../shared/errors/appError';
import { CredentialsError } from '../../../shared/errors/credentialsError';
import { FormError } from '../../../shared/errors/formError';
import { useCurrentSearchParam } from '../../../shared/hooks/useCurrentSearchParam';
import globalErrorHandler from '../../../shared/utils/globalErrorHandler';
import setFormErrors from '../../../shared/utils/setFormErrors';
import { LoginModel } from '../../models/login.model';
import { login as authLogin } from '../../services/auth.service';
import classes from './login.module.scss';

const Login = () => {
    const returnPath = useCurrentSearchParam("returnPath");
    const resolver = classValidatorResolver(LoginModel);
    const [showPassword, setShowPassword] = useState(false);
    const { control, handleSubmit, setError, formState: { errors } } = useForm<LoginModel>({
        mode: 'onChange',
        resolver,
    })

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const settingFormErrors = (error: AppError) => {
      if (error instanceof FormError) {
        setFormErrors(error, setError)
      } else if (error instanceof CredentialsError) {
        setError('root', { type: 'invalidCredentials', message: error.originalError.message });
      } else {
        globalErrorHandler(error);
      }
    }

    const login = (formValues: LoginModel) => {
        console.log("login form values: ", formValues);
        
        authLogin(formValues).catch(settingFormErrors)
    }

    return ( 
        <div className={classes.component}>
            <form onSubmit={handleSubmit(login)}>
                {errors.root?.type === 'invalidCredentials' && <FormHelperText error={true}>{errors.root.message}</FormHelperText>}
                <FormGroup className={classes.group}>
                    <Controller
                        defaultValue=""
                        render={({ field, fieldState }) => {
                            return <FormControl variant="filled" className={classes.input}>
                            <InputLabel error={!!fieldState.error} htmlFor="email">
                                Email
                            </InputLabel>
                            <FilledInput
                              error={!!fieldState.error}
                              id="email"
                              value={field.value}
                              onChange={field.onChange}  
                              type={'text'}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="email"
                                    edge="end"
                                  >
                                    <EmailIcon />
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                            <FormHelperText error={!!fieldState.error}>
                                {fieldState.error?.message}
                            </FormHelperText>
                          </FormControl>
                        }}
                        name={'email'}
                        control={control}
                    />
                    <Controller
                        defaultValue=""
                        render={({ field, fieldState }) => {
                            return <FormControl variant="filled" className={classes.input}>
                            <InputLabel error={!!fieldState.error} htmlFor="password">
                                Jelszó
                                </InputLabel>
                            <FilledInput
                              error={!!fieldState.error}
                              id="password"
                              value={field.value}
                              onChange={field.onChange}  
                              type={showPassword ? 'text' : 'password'}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                            <FormHelperText error={!!fieldState.error}>
                                {fieldState.error?.message}
                            </FormHelperText>
                          </FormControl>
                        }}
                        name={'password'}
                        control={control}
                    />
                </FormGroup>
                <div className={classes.actions}>
                  <Button sx={{width: 'fit-content', margin: '0 auto'}} variant='contained' type="submit">
                      Belépés
                  </Button>
                  <Link  to={{pathname: routes.signup, search: `?returnPath=${returnPath || routes.home}`}}>Regisztráció</Link>
                </div>
            </form>
        </div>
    )
}

export default Login