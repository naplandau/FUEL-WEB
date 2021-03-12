import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from 'react-redux';
import { Paper, Grid, Typography, InputLabel } from '@material-ui/core';
import { Button, TextField } from "@material-ui/core";
import { withRouter } from "react-router-dom";

import { RootState } from "../../reducers/root.reducer";
import RouterProps from '../../types/RouterProps.type';
import SideBar from '../Home/SideBar';

import '../../styles/components/ListUsers/UserDetails.scss';

import { fetchUserDetails, resetUser } from '../../reducers/user.reducer';

const statesToProps = (state: RootState) => ({
    user: state.userReducer.user,
    accessToken: state.authenticationReducer.accessToken,
});

const dispatchToProps = {
    fetchUserDetails,
    resetUser,
};

const connector = connect(statesToProps, dispatchToProps);

type UserDetailsProps = ConnectedProps<typeof connector> & RouterProps;

const UserDetails = ({
    user,
    accessToken,
    fetchUserDetails,
    resetUser,
    history,
}: UserDetailsProps) => {
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState(0);
    const [status, setStatus] = useState(0);

    useEffect(() => {
        if (userId) {
            fetchUserDetails(userId);
        }

        return () => {
            resetUser();
        }
    }, [userId, accessToken]);

    useEffect(() => {
        if (history.location.pathname.split('/')[2]) {
            return setUserId(history.location.pathname.split('/')[2])
        }
        setUserId('');
    }, [history.location.pathname]);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPhoneNumber(user.phoneNumber);
            setRole(user.role);
            setStatus(user.status);
        }
    }, [user])

    return (
        <div className='container'>
            <SideBar history={history} />
            <div className='content'>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} className="UserDetail__wrapper">
                        <Paper className="UserDetail__paper">
                            <TextField
                                variant='outlined'
                                className="UserDetail__text-field"
                                autoFocus
                                label="Tên người dùng"
                                fullWidth
                                value={name}
                                disabled
                            />
                            <TextField
                                variant='outlined'
                                className="UserDetail__text-field"
                                autoFocus
                                label="Email người dùng"
                                fullWidth
                                value={email}
                                disabled
                            />
                            <TextField
                                variant='outlined'
                                className="UserDetail__text-field"
                                autoFocus
                                label="Số điện thoại người dùng"
                                fullWidth
                                value={phoneNumber}
                                disabled
                            />
                            <TextField
                                variant='outlined'
                                className="UserDetail__text-field"
                                autoFocus
                                label="Vai trò"
                                fullWidth
                                value={role === 0 ? "Người dùng" : "Admin"}
                                disabled
                            />
                            <TextField
                                variant='outlined'
                                className="UserDetail__text-field"
                                autoFocus
                                label="Trạng thái"
                                fullWidth
                                value={status}
                                disabled
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default withRouter(connector(UserDetails));