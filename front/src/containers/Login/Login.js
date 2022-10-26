import React from 'react';
import {useDispatch} from "react-redux";
import GoogleLoginButton from "react-google-login";
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import {Box, Button} from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import {Google} from "@mui/icons-material";
import {facebookAppId, googleClientId} from "../../config";
import {facebookLoginRequest, googleLoginRequest} from "../../store/actions/usersActions";

const Login = () => {
    const dispatch = useDispatch();

    const facebookResponse = response => {
        dispatch(facebookLoginRequest(response));
    };

    const googleResponse = response => {
        console.log(response);
        dispatch(googleLoginRequest(response));
    };

    return (
        <Box width="250px" margin=" 100px auto">
            <GoogleLoginButton
                clientId={googleClientId}
                cookiePolicy={'single_host_origin'}
                onSuccess={googleResponse}
                render={props => (
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        startIcon={<Google/>}
                        onClick={props.onClick}
                        sx={{marginBottom: '20px'}}
                    >
                        Log in with Google
                    </Button>
                )}
            />
            <FacebookLoginButton
                appId={facebookAppId}
                fields="name,email,picture"
                callback={facebookResponse}
                render={props => (
                    <Button
                        sx={{marginBottom: '12px'}}
                        fullWidth
                        color="primary"
                        variant="contained"
                        startIcon={<FacebookIcon/>}
                        onClick={props.onClick}
                    >
                        Enter with Facebook
                    </Button>
                )}
            />
        </Box>
    );
};

export default Login;