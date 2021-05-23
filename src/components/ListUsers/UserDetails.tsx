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
import loading from '../../assets/loadings/medium.loading.gif';
import TablePagination from '@material-ui/core/TablePagination';

import { RootState } from "../../reducers/root.reducer";
import RouterProps from '../../types/RouterProps.type';
import SideBar from '../Home/SideBar';

import moment from 'moment';
import formatter from '../../utils/formatter.utils';

import '../../styles/components/ListUsers/UserDetails.scss';

import { fetchUserDetails, resetUser } from '../../reducers/user.reducer';
import { fetchUserListTransactions, clearUserListTransactions } from '../../reducers/transaction.reducer';
import { fetchUserListVouchers, clearUserListVouchers } from '../../reducers/voucher.reducer';

const statesToProps = (state: RootState) => ({
    user: state.userReducer.user,
    accessToken: state.authenticationReducer.accessToken,
    listTransactions: state.transactionReducer.userListTransactions,
    vouchers: state.voucherReducer.userListVouchers,
    isFetchingUser: state.userReducer.isFetchingUser,
});

const dispatchToProps = {
    fetchUserDetails,
    resetUser,
    fetchUserListTransactions,
    clearUserListTransactions,
    fetchUserListVouchers,
    clearUserListVouchers
};

const connector = connect(statesToProps, dispatchToProps);

type UserDetailsProps = ConnectedProps<typeof connector> & RouterProps;

const UserDetails = ({
    user,
    accessToken,
    listTransactions,
    isFetchingUser,
    fetchUserDetails,
    fetchUserListTransactions,
    clearUserListTransactions,
    resetUser,
    history,
    vouchers,
    fetchUserListVouchers,
    clearUserListVouchers
}: UserDetailsProps) => {
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState(0);
    const [status, setStatus] = useState(0);

    const checkVoucherStatus = (status: number, isOn: boolean) => {
        if (status === 0 && isOn === true) {
            return 'Thẻ quà chưa sử dụng'
        }
        else if (status === 1 && isOn === true) {
            return 'Thẻ quà đã sử dụng'
        }
        else return 'Thẻ đã hết hiệu lực'
    }

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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
    }, [clearUserListTransactions, fetchUserListTransactions, userId, accessToken]);

    useEffect(() => {
        if (userId) {
            fetchUserListVouchers(userId);
        }

        return () => {
            clearUserListVouchers();
        }
    }, [clearUserListVouchers, fetchUserListVouchers, userId, accessToken]);

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

    if (isFetchingUser) {
        return (
            <div style={{ width: 150, margin: 'auto' }}>
                <img src={loading} alt="Loading..." />
            </div>
        );
    }

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
                        <InputLabel className="StationDetail__input-lable">Lịch sử giao dịch:</InputLabel>
                        <TableContainer component={Paper}>
                            <Table stickyHeader aria-label="simple table">
                                <TableHead className='header-table'>
                                    <TableRow>
                                        <TableCell align="center" className="tableRightBorder">Người sở hữu</TableCell>
                                        <TableCell align="center" className="tableRightBorder">Trạng thái</TableCell>
                                        <TableCell align="center" className="tableRightBorder">Số tiền thanh toán</TableCell>
                                        <TableCell align="center" className="tableRightBorder">Ngày cập nhật</TableCell>
                                    </TableRow>
                                </TableHead>
                                {listTransactions.length > 0 && <TableBody>
                                    {listTransactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction) => {
                                        return <TableRow key={transaction._id} >
                                            <TableCell align="center" className="tableRightBorder">{transaction.userInfo.phoneNumber}</TableCell>
                                            <TableCell align="center" className="tableRightBorder">{_status(transaction.status)}</TableCell>
                                            <TableCell align="center" className="tableRightBorder">{formatter.format(transaction.amount.payAmount)}</TableCell>
                                            <TableCell align="center" className="tableRightBorder">{moment(transaction.updatedAt).format('L') + ' ' + moment(transaction.updatedAt).format('LTS')}</TableCell>
                                        </TableRow>
                                    })
                                    }
                                </TableBody>}
                            </Table>
                        </TableContainer>
                        <TablePagination
                            height="150px"
                            labelRowsPerPage="Số dòng mỗi trang: "
                            rowsPerPageOptions={[5, 10, 20]}
                            component="div"
                            count={listTransactions.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                        <InputLabel className="StationDetail__input-lable">Danh sách thẻ quà tặng:</InputLabel>
                        <TableContainer component={Paper}>
                            <Table stickyHeader aria-label="simple table">
                                <TableHead className='header-table'>
                                    <TableRow>
                                        <TableCell align="center" className="tableRightBorder">Người sở hữu</TableCell>
                                        <TableCell align="center" className="tableRightBorder">Người tặng</TableCell>
                                        <TableCell align="center" className="tableRightBorder">Loại thẻ</TableCell>
                                        <TableCell align="center" className="tableRightBorder">Trạng thái thẻ quà</TableCell>
                                        <TableCell align="center" className="tableRightBorder">Ngày khởi tạo</TableCell>
                                    </TableRow>
                                </TableHead>
                                {vouchers.length > 0 && <TableBody>
                                    {vouchers.map((voucher) => {
                                        return <TableRow key={voucher._id} >
                                            <TableCell align="center" className="tableRightBorder">{voucher.owner.phoneNumber}</TableCell>
                                            <TableCell align="center" className="tableRightBorder">{voucher.type === 0 ? voucher.donator.phoneNumber : ''}</TableCell>
                                            <TableCell align="center" className="tableRightBorder">{voucher.type === 0 ? "Thẻ được tặng" : "Thẻ sở hữu"}</TableCell>
                                            <TableCell align="center" className="tableRightBorder">{checkVoucherStatus(voucher.status, voucher.isOn)}</TableCell>
                                            <TableCell align="center" className="tableRightBorder">{moment(voucher.createdAt).format('L') + ' ' + moment(voucher.createdAt).format('LTS')}</TableCell>
                                        </TableRow>
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