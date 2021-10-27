import React, { useState } from 'react';

import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom"


import useStyles from './styles';
import Input from './Input';
import Icon from './icon';

import { signin, signup } from '../../actions/auth'

const initialStete = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const Auth = () => {

    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialStete);

  //  const isSignup = true;
    const [isSignup, setisSignup] = useState(false);
    const dispatch = useDispatch();

    const history = useHistory();
    
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData)

        if (isSignup) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }

    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

  const handleShowPassword = () => setShowPassword(!showPassword);

    const switchMode = () => {
        setisSignup((previsSignup) => !previsSignup)
        setShowPassword(false);
    }
    
    const googleSuccess = async (res) => {

        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } })
            history.push('/')
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = () => {
        console.log("Google sign in was unsuccessful. Try again.")
    }

    return (
        <Container components="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography vaiant="h5">{isSignup ? 'Sign up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last name" handleChange={handleChange} xs={6} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}  />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="passowrd" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            {isSignup ? "Sing Up" : "Sing In" }
                    </Button>
                    <GoogleLogin clientId="572099739500-003ml8imj3u1suhcktdd3o5ncbsh3u26.apps.googleusercontent.com" render={(renderProps) => (
                        <Button
                            className={classes.googleButton}
                            color='primary'
                            fullWidth
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            startIcon={<Icon />}
                            variant="contained">
                            Google Sign In
                            </Button>
                    )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}> {isSignup ? "Already have an account? Sign In" : "Don't have an acoount? Sign Up" }</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;