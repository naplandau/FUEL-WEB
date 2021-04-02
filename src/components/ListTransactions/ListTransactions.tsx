import { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { withRouter } from "react-router-dom";
import { TextField, Paper } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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

    const status = (status: number) => {
        if (status === 10) {
            return 'Thành công';
        }
        else if (status % 2 === 1) {
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
                                    <TableCell align="center">{status(transaction.status)}</TableCell>
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
            </div>
        </div >
    )
}

export default withRouter(connector(ListTransactions));