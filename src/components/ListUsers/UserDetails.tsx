import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from 'react-redux';
import { Paper, Grid } from '@material-ui/core';
import { TextField, InputLabel } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { RootState } from "../../reducers/root.reducer";
import RouterProps from '../../types/RouterProps.type';
import SideBar from '../Home/SideBar';

import '../../styles/components/ListUsers/UserDetails.scss';

import { fetchUserDetails, resetUser } from '../../reducers/user.reducer';
import { fetchUserListTransactions, clearUserListTransactions } from '../../reducers/transaction.reducer';

const statesToProps = (state: RootState) => ({
    user: state.userReducer.user,
    accessToken: state.authenticationReducer.accessToken,
    listTransactions: state.transactionReducer.userListTransactions,
});

const dispatchToProps = {
    fetchUserDetails,
    resetUser,
    fetchUserListTransactions,
    clearUserListTransactions
};

const connector = connect(statesToProps, dispatchToProps);

type UserDetailsProps = ConnectedProps<typeof connector> & RouterProps;

const UserDetails = ({
    user,
    accessToken,
    listTransactions,
    fetchUserDetails,
    fetchUserListTransactions,
    clearUserListTransactions,
    resetUser,
    history,
}: UserDetailsProps) => {
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState(0);
    const [status, setStatus] = useState(0);

    const _status = (status: number) => {
        if (status === 10) {
            return 'Thành công';
        }
        else if (status % 2 === 1) {
            return 'Thất bại';
        }
        else return 'Đang tiến hành';
    }

    useEffect(() => {
        if (userId) {
            fetchUserDetails(userId);
        }

        return () => {
            resetUser();
        }
    }, [userId, accessToken, fetchUserDetails, resetUser]);

    useEffect(() => {
        if (userId) {
            fetchUserListTransactions(userId);
        }

        return () => {
            clearUserListTransactions();
        }
    }, [clearUserListTransactions, fetchUserListTransactions, userId, accessToken])

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
                    {/* <div className="avatar">
                        <img src={user.avatar} alt="" />
                    </div> */}
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
                        <InputLabel className="StationDetail__input-lable">Danh sách hoá đơn:</InputLabel>
                        <TableContainer component={Paper}>
                            <Table stickyHeader aria-label="simple table">
                                <TableHead className='header-table'>
                                    <TableRow>
                                        <TableCell align="center">Người sở hữu</TableCell>
                                        <TableCell align="center">Trạng thái</TableCell>
                                        <TableCell align="center">Số tiền thanh toán</TableCell>
                                        <TableCell align="center">Ngày cập nhật</TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                                {listTransactions.length > 0 && <TableBody>
                                    {listTransactions.map((transaction) => {
                                        // if (voucher.phoneNumber.includes(searchPattern)) {
                                        return <TableRow key={transaction._id} >
                                            <TableCell align="center">{transaction.userInfo.phoneNumber}</TableCell>
                                            <TableCell align="center">{_status(transaction.status)}</TableCell>
                                            <TableCell align="center">{transaction.amount.payAmount}</TableCell>
                                            <TableCell align="center">{(new Date(transaction.updatedAt)).toLocaleDateString()}</TableCell>
                                            <TableCell align="center">
                                                {/* <IconButton
                                            onClick={() => {
                                                history.push(`vouchers/${voucher._id}`)
                                            }}
                                        >
                                            <NavigateNextIcon />
                                        </IconButton> */}

                                            </TableCell>
                                        </TableRow>
                                        // }
                                        // return null;
                                    })
                                    }
                                </TableBody>}
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default withRouter(connector(UserDetails));