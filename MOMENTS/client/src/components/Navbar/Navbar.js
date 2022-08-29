import React , {useState, useEffect, useCallback} from 'react';
import {AppBar, Button,Avatar, Toolbar, Typography } from '@material-ui/core';
import {Link,useHistory,useLocation } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import decode from 'jwt-decode';
import useStyles from './styles';
import momentsText from '../../images/moments_text.png';
import momentsLogo from '../../images/memories_logo.jfif';


const Navbar = () => { 
const classes = useStyles();
const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
const dispatch = useDispatch();
const history = useHistory();
const location = useLocation();

// const logout = () => {
//     dispatch({ type: 'LOGOUT'});
//     history.push('/');

//     setUser(null);

// };

const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT'});
        history.push('/');
    
        setUser(null);

},[history,dispatch])
const temp = user?.token;
useEffect(() => {
    
const token = temp;

if(token) {
    const decodedToken = decode(token);

    if(decodedToken.exp*1000<new Date().getTime())logout();
}

setUser(JSON.parse(localStorage.getItem('profile')));

}, [temp,location,logout]);

return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
           <img src = {momentsText} alt="icon" height="45px" />
            <img className ={classes.image} src={momentsLogo} alt="icon" height="40px" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile} >
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)} </Avatar>
                        <Typography className={classes.userName} variant="h6"> {user.result.name}</Typography>                
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to ="/auth" variant="contained" color="primary" >Sign In</Button>

                ) }
            </Toolbar>
        </AppBar>
        );
};

export default Navbar;