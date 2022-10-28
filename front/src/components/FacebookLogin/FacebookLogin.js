import React from 'react';
import {facebookAppId} from "../../config";
import {Button} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import FacebookLoginButton from "react-facebook-login/dist/facebook-login-render-props";
import {facebookLoginRequest} from "../../store/actions/usersActions";
import {useDispatch} from "react-redux";

const FacebookLogin = () => {
    const dispatch = useDispatch();
    const facebookResponse = response => {
        dispatch(facebookLoginRequest(response));
    };

    return (
        <FacebookLoginButton
            appId={facebookAppId}
            fields="name,email,picture"
            callback={facebookResponse}
            render={props => (
                <Button
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
    );
};

export default FacebookLogin;