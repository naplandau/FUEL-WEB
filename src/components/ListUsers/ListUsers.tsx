import React, { useEffect } from "react";
import { connect, ConnectedProps } from 'react-redux';
import SideBar from '../Home/SideBar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withRouter } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import { RootState } from "../../reducers/root.reducer";
import { getUsers } from "../../reducers/user.reducer";
import HistoryProps from "../../types/HistoryProps.type";

import '../../styles/components/ListUsers/ListUsers.scss';

const statesToProps = (state: RootState) => ({
    users: state.userReducer.listUsers,
    selected: state.sidebarReducer.selected
});

const dispatchToProps = {
    getUsers
};

const connector = connect(statesToProps, dispatchToProps);

type HomeProps = ConnectedProps<typeof connector> & HistoryProps;

const Home = ({
    history,
    users,
    getUsers }: HomeProps) => {

    useEffect(() => {
        getUsers();
    }, []);

    console.log(users)


    return (
        <div className='container'>
            <SideBar history={history} />
            <div className='content'>
                <TableContainer component={Paper}>
                    <Table stickyHeader aria-label="simple table">
                        <TableHead className='header-table'>
                            <TableRow>
                                <TableCell align="center">Họ Tên</TableCell>
                                <TableCell align="center">Số điện thoại</TableCell>
                                <TableCell align="center">Vai trò</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        {users.length > 0 && <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id} >
                                    <TableCell align="center">{user.name}</TableCell>
                                    <TableCell align="center">{user.phoneNumber}</TableCell>
                                    <TableCell align="center">{user.role === 0 ? "Người dùng" : "Quản trị viên"}</TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            onClick={() => {
                                                history.push(`users/${user.id}`)
                                            }}
                                        >
                                            <NavigateNextIcon />
                                        </IconButton>

                                    </TableCell>
                                </TableRow>
                            )
                            )}
                        </TableBody>}
                    </Table>
                </TableContainer>
            </div>
        </div >
    )
}

export default withRouter(connector(Home));