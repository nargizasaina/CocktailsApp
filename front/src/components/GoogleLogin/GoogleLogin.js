import React from 'react';
import {googleClientId} from "../../config";
import {Button} from "@mui/material";
import {Google} from "@mui/icons-material";
import GoogleLoginButton from "react-google-login";
import {googleLoginRequest} from "../../store/actions/usersActions";
import {useDispatch} from "react-redux";

const GoogleLogin = () => {
    const dispatch = useDispatch();
    const googleResponse = response => {
        dispatch(googleLoginRequest(response));
    };

    return (
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
                    Enter with Google
                </Button>
            )}
        />
    );
};

export default GoogleLogin;