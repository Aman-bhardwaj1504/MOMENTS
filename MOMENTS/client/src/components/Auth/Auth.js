import React,{useState} from 'react';
import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import { GoogleOAuthProvider,GoogleLogin} from '@react-oauth/google';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';


import LockOutlinkedIcon from '@material-ui/icons/LockOutlined';
import Input  from './input';
import {signin,signup} from '../../actions/auth';

import useStyles from './styles';

const initialState = {firstName: '',lastName: '',email: '', password:'',confirmPassword:''  }



const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData ] = useState(initialState);
    const dispatch=  useDispatch();
    const history = useHistory();
    


    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formData, history));

        }else{
            dispatch(signin(formData, history));

        }

    };

    const handleChange = (e) =>{
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };

    const switchMode = () =>{
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const googleSuccess = async (res) =>{
        const result = jwt_decode(res?.credential);
        const token = res?.credential;

        try{
            dispatch({type: 'AUTH', data: {result,token}});

            history.push('/');

        }catch (error) {
            console.log(error);
        }

    

    }; 
    const googleFailure=() => {

        console.log('Google sign in was unsucessful. Try Again Later');
    };

  return (
    
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className= {classes.avatar}>
                <LockOutlinkedIcon />
            </Avatar>
            <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className ={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                            
                               <Input name ="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                               <Input name ="lastName" label="Last Name" handleChange={handleChange} half />
                            
                            </>
                        )}
                        <Input name ="email" label="Email Address" handleChange={handleChange} type = "email" />
                        <Input name= "password" label= "Password" handleChange={handleChange} type = {showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name= "confirmPassword" label="Repeat Password"  handleChange={handleChange} type ="password" />}

                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Button>
                <GoogleOAuthProvider clientId="452537505441-25c1i9bh4kjie94bs0lv79s2sh0a4obl.apps.googleusercontent.com">
                <Button type="submit" fullWidth variant="contained" color="primary"  className={classes.submit}>
                    {
                        isSignup ? (
                           <div>WELCOME</div>
                        ) : (
                            
                            <GoogleLogin
                            onSuccess={ googleSuccess}
                            onError = {googleFailure}
                            />
                            )}
                            </Button>
                           

                    </GoogleOAuthProvider>
                


                <Grid container justifyContent="flex-end">
                    <Grid item>
                    <Button onClick={switchMode}>
                        {isSignup ? 'Already have an account ? Sign In' : "Don't have an account ? Sign Up"}
                    </Button>
                    </Grid>
                </Grid>
            </form>

        </Paper>

    </Container>
  );
};

export default Auth;