import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core"
import { useEffect, useState } from "react";

import { Link, Redirect, withRouter } from "react-router-dom";
import loading from '../assets/loadings/small-secondary.loading.gif';

import '../styles/components/Login.scss';

import paths from "../configs/paths.config";

const Login = () => {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [logging, isLogging] = useState(false)

    return (
        <div className="Login">
            <Grid container>
                <Grid item xs={11} sm={7} md={5} lg={3} className="Login__wrapper">
                    <Paper className="Login__paper">
                        <Typography variant="h4" className="title Login__title">Đăng nhập</Typography>

                        {error && <Typography className="error" variant="body1">{error}</Typography>}

                        <TextField
                            className="Login__text-field"
                            label="Email"
                            variant="outlined"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            disabled={logging}
                        >
                            {!logging ? 'Đăng nhập' : <img src={loading} alt="loading..." height={23} />}
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default withRouter(Login);