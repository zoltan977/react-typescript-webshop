import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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

import { handleFormErrors } from '../../../shared/utils/handleFormErrors';
import { SignupModel } from '../../models/signup.model';
import { signup as authSignup } from '../../services/auth.service';
import classes from './signup.module.scss';

const Signup = () => {
    const resolver = classValidatorResolver(SignupModel);
    const [showPassword, setShowPassword] = useState(false);
    const { control, handleSubmit, setError } = useForm<SignupModel>({
        mode: 'onChange',
        resolver,
    })

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const signup = async (formValues: SignupModel) => {
        console.log("signup form values: ", formValues);
        
        try {
          await authSignup(formValues);
        } catch (error) {
          handleFormErrors(error, setError);
        }
    }

    return ( 
        <div className={classes.component}>
            <form onSubmit={handleSubmit(signup)}>
                <FormGroup className={classes.group}>
                    <Controller
                        defaultValue=""
                        render={({ field, fieldState }) => {
                            return <FormControl variant="filled" className={classes.input}>
                            <InputLabel error={!!fieldState.error} htmlFor="username">
                              Felhasználónév
                            </InputLabel>
                            <FilledInput
                              error={!!fieldState.error}
                              id="username"
                              value={field.value}
                              onChange={field.onChange}  
                              type={'text'}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="username"
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
                        name={'username'}
                        control={control}
                    />
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
                    <Controller
                        defaultValue=""
                        render={({ field, fieldState }) => {
                            return <FormControl variant="filled" className={classes.input}>
                            <InputLabel error={!!fieldState.error} htmlFor="passwordConfirm">
                              Jelszó
                            </InputLabel>
                            <FilledInput
                              error={!!fieldState.error}
                              id="passwordConfirm"
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
                        name={'confirmPassword'}
                        control={control}
                    />
                    <Button sx={{width: 'fit-content', margin: '0 auto'}} variant='contained' type="submit">
                      Regisztrálok!
                    </Button>
                </FormGroup>
            </form>
        </div>
    )
}

export default Signup;