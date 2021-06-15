import { useEffect, useState } from "react";
import { connect, ConnectedProps } from 'react-redux';
import SideBar from '../Home/SideBar';
import { Button, TextField } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import { withRouter } from "react-router-dom";
import moment from 'moment';
import formatter from '../../utils/formatter.utils';
import AddPriceDialog from './AddPriceDialog';
import { RootState } from "../../reducers/root.reducer";
import { fetchListHistoryPrices, clearListHistoryPrices } from "../../reducers/price.reducer";
import HistoryProps from "../../types/HistoryProps.type";

import '../../styles/components/ListHistoryPrices/ListHistoryPrices.scss';

const statesToProps = (state: RootState) => ({
    prices: state.historyPriceReducer.listHistoryPrices,
    priceFlag: state.accountReducer.priceFlag,
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
    priceFlag,
    fetchListHistoryPrices,
    clearListHistoryPrices }: HomeProps) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [addPriceDialog, setAddPriceDialog] = useState(false);

    moment.locale('vi');

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

    const openAddPriceDialog = () => {
        setAddPriceDialog(true);
    }

    const closeAddPriceDialog = () => {
        setAddPriceDialog(false);
    }
    // const [searchPattern, changeSearchPattern] = useState('');

    return (
        <div className='container'>
            <SideBar history={history} />
            <div className='content'>
                <div className='ListHistoryPrices__header'>
                    <div className="search-view">
                        <TextField
                            variant="outlined"
                            // label="Tìm người dùng theo số điện thoại"
                            className="ListHistoryPrices__search"
                            // value={searchPattern}
                            // onChange={(e) => changeSearchPattern(e.target.value)}
                        />

                    </div>
                    {priceFlag === "ADMIN" && <div className="ListHistoryPricess__buttons-custom">
                        <Button className='ListHistoryPricess__buttons' onClick={openAddPriceDialog} ><Add /></Button>
                    </div>}
                </div>
                <TableContainer component={Paper}>
                    <Table stickyHeader aria-label="simple table">
                        <TableHead className='header-table'>
                            <TableRow>
                                <TableCell align="center" className="tableRightBorder">Thời gian cập nhật</TableCell>
                                <TableCell align="center" className="tableRightBorder">Loại giá xăng</TableCell>
                                <TableCell align="center" className="tableRightBorder">Xăng RON 95-III</TableCell>
                                <TableCell align="center" className="tableRightBorder">Xăng E5 RON 92-II</TableCell>
                                <TableCell align="center" className="tableRightBorder">Dầu DO 0,05S-II</TableCell>
                                <TableCell align="center" className="tableRightBorder">Dầu KO</TableCell>
                            </TableRow>
                        </TableHead>
                        {prices.length > 0 && <TableBody>
                            {prices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((price) => {
                                return <TableRow key={price._id} >
                                    <TableCell align="center" className="tableRightBorder">{moment(price.updatedAt).format('L') + ' ' + moment(price.updatedAt).format('LTS')}</TableCell>
                                    <TableCell align="center" className="tableRightBorder">{price.type === "ADMIN" ? 'Giá hệ thống':'Giá tự động' }</TableCell>
                                    {Object.values(price.fuels).map((row) => {
                                        return <TableCell align="center" className="tableRightBorder">{formatter.format(row)}</TableCell>

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
            <AddPriceDialog open={addPriceDialog} onClose={closeAddPriceDialog} />
        </div >
    )
}

export default withRouter(connector(ListUsers));