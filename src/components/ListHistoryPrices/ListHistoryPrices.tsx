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

import { RootState } from "../../reducers/root.reducer";
import { fetchListHistoryPrices, clearListHistoryPrices } from "../../reducers/price.reducer";
import HistoryProps from "../../types/HistoryProps.type";

import '../../styles/components/ListHistoryPrices/ListHistoryPrices.scss';

const statesToProps = (state: RootState) => ({
    prices: state.historyPriceReducer.listHistoryPrices,
});

const dispatchToProps = {
    fetchListHistoryPrices,
    clearListHistoryPrices
};

const connector = connect(statesToProps, dispatchToProps);

type HomeProps = ConnectedProps<typeof connector> & HistoryProps;

const ListUsers = ({
    history,
    prices,
    fetchListHistoryPrices,
    clearListHistoryPrices }: HomeProps) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        fetchListHistoryPrices();
    }, [fetchListHistoryPrices]);

    // const [searchPattern, changeSearchPattern] = useState('');

    return (
        <div className='container'>
            <SideBar history={history} />
            <div className='content'>
                {/* <div className="search-view">
                    <TextField
                        variant="outlined"
                        label="Tìm người dùng theo số điện thoại"
                        className="ListUsers__search-users"
                        value={searchPattern}
                        onChange={(e) => changeSearchPattern(e.target.value)}
                    />

                </div> */}
                {/* <div></div> */}
                <TableContainer component={Paper}>
                    <Table stickyHeader aria-label="simple table">
                        <TableHead className='header-table'>
                            <TableRow>
                                <TableCell align="center">Thời gian cập nhật</TableCell>
                                <TableCell align="center">Xăng RON 95-IV</TableCell>
                                <TableCell align="center">Xăng RON 95-III</TableCell>
                                <TableCell align="center">E5 RON 92-II</TableCell>
                                <TableCell align="center">DO 0,001S-V</TableCell>
                                <TableCell align="center">DO 0,05S-II</TableCell>
                                <TableCell align="center">Dầu hỏa 2-K</TableCell>
                            </TableRow>
                        </TableHead>
                        {prices.length > 0 && <TableBody>
                            {prices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((price) => {
                                return <TableRow key={price._id} >
                                    <TableCell align="center">{new Date(price.updatedAt).toLocaleString()}</TableCell>
                                    {price.fuels.map((row) => {
                                        return <TableCell align="center">{row.price}</TableCell>

                                    })
                                    }
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
                    count={prices.length}
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