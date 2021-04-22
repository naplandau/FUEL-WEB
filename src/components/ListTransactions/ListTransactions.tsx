import { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { withRouter } from "react-router-dom";
import { TextField, Paper } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import formatter from '../../utils/formatter.utils';

import { RootState } from "../../reducers/root.reducer";
import RouterProps from "../../types/RouterProps.type";

import SideBar from '../Home/SideBar';

import '../../styles/components/ListTransactions/ListTransactions.scss';

import { fetchListTransactions, clearListTransactions } from '../../reducers/transaction.reducer';

const mapStateToProps = (state: RootState) => ({
    listTransactions: state.transactionReducer.listTransactions,
});

const mapDispatchToProps = {
    fetchListTransactions,
    clearListTransactions
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ListTransactionsProps = ConnectedProps<typeof connector> & RouterProps;

const ListTransactions = ({
    history,
    listTransactions,
    fetchListTransactions,
    clearListTransactions
}: ListTransactionsProps) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const status = (status: number) => {
        if (status === 10) {
            return 'Thành công';
        }
        else if (status % 10 === 1) {
            return 'Thất bại';
        }
        else return 'Đang tiến hành';
    }

    useEffect(() => {
        fetchListTransactions();
    }, [fetchListTransactions])
    return (
        <div className='container'>
            <SideBar history={history} />
            <div className='content'>
                <div className="search-view">
                    <TextField
                        variant="outlined"
                        label="Tìm giao dịch theo số điện thoại"
                        className="ListTransactions__search-transactions"
                    // value={searchPattern}
                    // onChange={(e) => changeSearchPattern(e.target.value)}
                    />

                </div>
                <TableContainer component={Paper}>
                    <Table stickyHeader aria-label="simple table">
                        <TableHead className='header-table'>
                            <TableRow>
                                <TableCell align="center" className="tableRightBorder">Người sở hữu</TableCell>
                                <TableCell align="center" className="tableRightBorder">Trạng thái</TableCell>
                                <TableCell align="center" className="tableRightBorder">Số tiền thanh toán</TableCell>
                                <TableCell align="center" className="tableRightBorder">Ngày cập nhật</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        {listTransactions.length > 0 && <TableBody>
                            {listTransactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction) => {
                                // if (voucher.phoneNumber.includes(searchPattern)) {
                                return <TableRow key={transaction._id} >
                                    <TableCell align="center" className="tableRightBorder">{transaction.userInfo.phoneNumber}</TableCell>
                                    <TableCell align="center" className="tableRightBorder">{status(transaction.status)}</TableCell>
                                    <TableCell align="center" className="tableRightBorder">{formatter.format(transaction.amount.payAmount)}</TableCell>
                                    <TableCell align="center" className="tableRightBorder">{moment(transaction.updatedAt).format('L') + ' ' + moment(transaction.updatedAt).format('LTS')}</TableCell>
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
            </div>
        </div >
    )
}

export default withRouter(connector(ListTransactions));