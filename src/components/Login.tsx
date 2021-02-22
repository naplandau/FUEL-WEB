import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core"
import { connect, ConnectedProps } from 'react-redux';
import { useEffect, useState } from "react";

import { Link, Redirect, withRouter } from "react-router-dom";
import loading from '../assets/loadings/small-secondary.loading.gif';

import '../styles/components/Login.scss';

import paths from "../configs/paths.config";
import { RootState } from "../reducers/root.reducer";
import { login } from "../reducers/authorization.reducer"

const mapStateToProps = (state: RootState) => ({
    loginError: state.authorizationReducer.error,
    refreshToken: state.authorizationReducer.refreshToken,
});

const mapDispatchToProps = {
    login
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type LoginProps = ConnectedProps<typeof connector>;

const Login = (props: LoginProps) => {
    const [error, setError] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [isLogging, setIsLogging] = useState(false);
    const [isLoginSuccess, setIsLoginSuccess] = useState(false);

    const validateData = () => {
        if (!phoneNumber) {
            return 'Phone number is required!';
        }

        if (phoneNumber.length > 10) {
            return 'Phone number can not contain more than 10 numbers!';
        }

        const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        if (!vnf_regex.test(phoneNumber)) {
            return 'Phone number is invalid!';
        }

        if (password.trim().length < 6) {
            return 'Unable to login!';
        }

        return '';
    };

    const onHandleLogin = async () => {
        const errorMessage = validateData();
        setError(errorMessage);

        if (errorMessage) {
            return false;
        }

        setIsLogging(true);

        props.login({
            phoneNumber,
            password,
            otpCode: "000000"
        });
        setIsLoginSuccess(true);

    };

    useEffect(() => {
        setError(props.loginError);
        setIsLogging(false);
        setIsLoginSuccess(false);
    }, [props.loginError]);

    if (isLoginSuccess) {
        <Redirect push to={paths.home} />
    }

    return (
        <div className="Login">
            <Grid container>
                <Grid item xs={11} sm={7} md={5} lg={3} className="Login__wrapper">
                    <Paper className="Login__paper">
                        <Typography variant="h4" className="title Login__title">Đăng nhập</Typography>

                        {error && <Typography className="error" variant="body1">{error}</Typography>}

                        <TextField
                            className="Login__text-field"
                            label="Số điện thoại"
                            variant="outlined"
                            type="email"
                            required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />

                        <TextField
                            className="Login__text-field"
                            label="Mật khẩu"
                            variant="outlined"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button
                            className="Login__button"
                            variant="contained"
                            disabled={isLogging}
                            onClick={onHandleLogin}
                        >

                            {!isLogging ? 'Đăng nhập' : <img src={loading} alt="loading..." height={23} />}
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default withRouter(connector(Login));