import React, {useState} from 'react';
import {makeStyles} from "tss-react/mui";
import {Alert, Avatar, Container, Grid, Typography} from "@mui/material";
import {LockOpenOutlined} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import FacebookLogin from "../../components/FacebookLogin/FacebookLogin";
import GoogleLogin from "../../components/GoogleLogin/GoogleLogin";
import InputField from "../../components/UI/Form/InputField/InputField";
import {loginRequest} from "../../store/actions/usersActions";

const useStyles = makeStyles()(theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: `${theme.palette.success.main} !important`,
    },
    submit: {
        margin: `${theme.spacing(0, 0, 4)} !important`,
    },
    alert: {
        margin: theme.spacing(3, 0),
        width: '100%',
    },
}));

const Login = () => {
    const { classes } = useStyles();

    const dispatch = useDispatch();
    const error = useSelector(state => state.users.error);
    const loading = useSelector(state => state.users.loading);

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setUser(prev => ({...prev, [name]: value}));
    };

    const submitFormHandler = e => {
        e.preventDefault();
        dispatch(loginRequest({...user}));
    };

    return (
        <Container maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOpenOutlined/>
                </Avatar>
                <Typography component="h1" variant="h6">
                    Sign in
                </Typography>

                {error && (
                    <Alert severity="error" className={classes.alert}>
                        Error! {error.message}
                    </Alert>
                )}

                <Grid
                    component="form"
                    onSubmit={submitFormHandler}
                    container
                    spacing={2}
                >
                    <InputField
                        required={true}
                        label="Email"
                        name="email"
                        value={user.email}
                        onChange={inputChangeHandler}
                    />

                    <InputField
                        type="password"
                        required={true}
                        label="Password"
                        name="password"
                        value={user.password}
                        onChange={inputChangeHandler}
                    />

                    <Grid item xs={12}>
                        <ButtonWithProgress
                            loading={loading}
                            disabled={loading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="success"
                            className={classes.submit}
                        >
                            Sign In
                        </ButtonWithProgress>
                    </Grid>

                    <Grid item xs={12}>
                        <FacebookLogin/>
                    </Grid>

                    <Grid item xs={12}>
                        <GoogleLogin/>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Login;