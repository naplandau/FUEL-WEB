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
import { IconButton, TextField } from "@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import moment from 'moment';

import { RootState } from "../../reducers/root.reducer";
import { fetchListVouchers } from "../../reducers/voucher.reducer";
import HistoryProps from "../../types/HistoryProps.type";

import '../../styles/components/ListVouchers/ListVouchers.scss';

const statesToProps = (state: RootState) => ({
    vouchers: state.voucherReducer.listVouchers,
    selected: state.sidebarReducer.selected
});

const dispatchToProps = {
    fetchListVouchers
};

const connector = connect(statesToProps, dispatchToProps);

type HomeProps = ConnectedProps<typeof connector> & HistoryProps;

const ListVouchers = ({
    history,
    vouchers,
    fetchListVouchers }: HomeProps) => {
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
        fetchListVouchers();
    }, []);

    const [searchPattern, changeSearchPattern] = useState('');

    const checkVoucherStatus = (status: number, isOn: boolean) => {
        if (status === 0 && isOn === true) {
            return 'Thẻ quà chưa sử dụng'
        }
        else if (status === 1 && isOn === true) {
            return 'Thẻ quà đã sử dụng'
        }
        else return 'Thẻ đã hết hiệu lực'
    }

    return (
        <div className='container'>
            <SideBar history={history} />
            <div className='content'>
                <div className="search-view">
                    <TextField
                        variant="outlined"
                        label="Tìm thẻ quà tặng theo số điện thoại"
                        className="ListVouchers__search-vouchers"
                        value={searchPattern}
                        onChange={(e) => changeSearchPattern(e.target.value)}
                    />

                </div>
                <TableContainer component={Paper}>
                    <Table stickyHeader aria-label="simple table">
                        <TableHead className='header-table'>
                            <TableRow>
                                <TableCell align="center" className="tableRightBorder">Người sở hữu</TableCell>
                                <TableCell align="center" className="tableRightBorder">Người tặng</TableCell>
                                <TableCell align="center" className="tableRightBorder">Loại thẻ</TableCell>
                                <TableCell align="center" className="tableRightBorder">Trạng thái thẻ quà</TableCell>
                                <TableCell align="center" className="tableRightBorder">Ngày khởi tạo</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        {vouchers.length > 0 && <TableBody>
                            {vouchers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((voucher) => {
                                // if (voucher.phoneNumber.includes(searchPattern)) {
                                return <TableRow key={voucher._id} >
                                    <TableCell align="center" className="tableRightBorder">{voucher.owner.phoneNumber}</TableCell>
                                    <TableCell align="center" className="tableRightBorder">{voucher.type === 0 ? voucher.donator.phoneNumber : ''}</TableCell>
                                    <TableCell align="center" className="tableRightBorder">{voucher.type === 0 ? "Thẻ được tặng" : "Thẻ sở hữu"}</TableCell>
                                    <TableCell align="center" className="tableRightBorder">{checkVoucherStatus(voucher.status, voucher.isOn)}</TableCell>
                                    <TableCell align="center" className="tableRightBorder">{moment(voucher.createdAt).format('L') + ' ' + moment(voucher.createdAt).format('LTS')}</TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            onClick={() => {
                                                history.push(`vouchers/${voucher._id}`)
                                            }}
                                        >
                                            <NavigateNextIcon />
                                        </IconButton>

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
                    count={vouchers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </div>
        </div >
    )
}

export default withRouter(connector(ListVouchers));