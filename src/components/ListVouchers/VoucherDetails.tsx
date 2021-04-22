import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from 'react-redux';
import SideBar from '../Home/SideBar';
import { Paper, Grid, Typography } from '@material-ui/core';
import { Button, TextField } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import loading from '../../assets/loadings/medium.loading.gif';

import { RootState } from "../../reducers/root.reducer";
import {  } from "../../reducers/voucher.reducer"
import RouterProps from '../../types/RouterProps.type';

import '../../styles/components/ListVouchers/VoucherDetail.scss';

import { fetchVoucherDetails, resetVoucher } from '../../reducers/voucher.reducer';

const statesToProps = (state: RootState) => ({
    voucher: state.voucherReducer.listVouchers,
    accessToken: state.authenticationReducer.accessToken,
    isFetchingVoucher: state.voucherReducer,
});

const dispatchToProps = {
    fetchVoucherDetails,
    resetVoucher
};

const connector = connect(statesToProps, dispatchToProps);

type VoucherDetailsProps = ConnectedProps<typeof connector> & RouterProps;

const VoucherDetail = ({
    voucher,
    accessToken,
    history,
    isFetchingVoucher,
    fetchVoucherDetails,
    resetVoucher
}: VoucherDetailsProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [long, setLong] = useState(0);
    const [lat, setLat] = useState(0);
    const [workingHourFrom, setWorkingHourFrom] = useState('');
    const [workingHourTo, setWorkingHourTo] = useState('');
    const [address, setAddress] = useState('');
    const [voucherId, setVoucherId] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (voucherId) {
            fetchVoucherDetails(voucherId);
        }

        return () => {
            resetVoucher();
        }
    }, [voucherId, accessToken, fetchVoucherDetails, resetVoucher]);

    useEffect(() => {
        if (history.location.pathname.split('/')[2]) {
            return setVoucherId(history.location.pathname.split('/')[2])
        }
        setVoucherId('');
    }, [history.location.pathname]);

    useEffect(() => {
        if (voucher) {
            
        }
    }, [voucher]);

    if (isFetchingVoucher) {
        return (
            <div style={{ width: 150, margin: 'auto' }}>
                <img src={loading} alt="Loading..." />
            </div>
        );
    }

    return (
        <div className="container">
            <SideBar history={history} />
            <div className="content">
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} className="VoucherDetail__wrapper">
                        {error && <Typography className="error" variant="body1">{error}</Typography>}
                        <Paper className="VoucherDetail__paper">
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        variant='outlined'
                                        className="VoucherDetail__text-field"
                                        autoFocus
                                        label="Tên cây xăng"
                                        fullWidth
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant='outlined'
                                        className="VoucherDetail__text-field"
                                        label="Địa chỉ"
                                        value={address}
                                        fullWidth
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <TextField
                                variant='outlined'
                                className="VoucherDetail__text-field"
                                label="Mô tả"
                                value={description}
                                fullWidth
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <Grid container spacing={2} style={{ marginTop: '10px' }}>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        className="VoucherDetail__text-field"
                                        type="number"
                                        label="Kinh độ"
                                        value={long}
                                        onChange={(e) => setLong(parseFloat(e.target.value))}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        className="VoucherDetail__text-field"
                                        type="number"
                                        label="Vĩ độ"
                                        value={lat}
                                        onChange={(e) => setLat(parseFloat(e.target.value))}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        className="VoucherDetail__text-field "
                                        type="time"
                                        label="Hoạt động từ"
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        value={workingHourFrom}
                                        onChange={(e) => setWorkingHourFrom(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        className="VoucherDetail__text-field"
                                        type="time"
                                        label="Hoạt động đến"
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        value={workingHourTo}
                                        onChange={(e) => setWorkingHourTo(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default withRouter(connector(VoucherDetail));