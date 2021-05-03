import { useEffect, useState } from "react";
import { connect, ConnectedProps } from 'react-redux';
import SideBar from '../Home/SideBar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import { withRouter } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { TextField } from '@material-ui/core';

import { RootState } from "../../reducers/root.reducer";
import { getUsers } from "../../reducers/user.reducer";
import HistoryProps from "../../types/HistoryProps.type";
import User from "../../types/User.type";

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

const ListUsers = ({
    history,
    users,
    getUsers }: HomeProps) => {

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const [searchPattern, changeSearchPattern] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div className='container'>
            <SideBar history={history} />
            <div className='content'>
                <div className="search-view">
                    <TextField
                        variant="outlined"
                        label="Tìm người dùng theo số điện thoại"
                        className="ListUsers__search-users"
                        value={searchPattern}
                        onChange={(e) => changeSearchPattern(e.target.value)}
                    />

                </div>
                <TableContainer component={Paper}>
                    <Table stickyHeader aria-label="simple table">
                        <TableHead className='header-table'>
                            <TableRow>
                                <TableCell align="center" className="tableRightBorder">Họ Tên</TableCell>
                                <TableCell align="center" className="tableRightBorder">Số điện thoại</TableCell>
                                <TableCell align="center" className="tableRightBorder">Vai trò</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        {users.length > 0 && <TableBody>
                            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user: User) => {
                                if (user.phoneNumber.includes(searchPattern)) {
                                    return <TableRow key={user.id} >
                                        <TableCell align="center" className="tableRightBorder">{user.name}</TableCell>
                                        <TableCell align="center" className="tableRightBorder">{user.phoneNumber}</TableCell>
                                        <TableCell align="center" className="tableRightBorder">{user.role === 0 ? "Người dùng" : "Quản trị viên"}</TableCell>
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
                                }
                                return null;
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
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </div>
        </div >
    )
}

export default withRouter(connector(ListUsers));