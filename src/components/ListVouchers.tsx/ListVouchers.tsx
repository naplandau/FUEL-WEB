import { useEffect, useState } from "react";
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
import { IconButton, TextField } from "@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';


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

    useEffect(() => {
        fetchListVouchers();
    }, []);

    const [searchPattern, changeSearchPattern] = useState('');


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
                                <TableCell align="center">Người sở hữu</TableCell>
                                <TableCell align="center">Người tặng</TableCell>
                                <TableCell align="center">Loại thẻ</TableCell>
                                <TableCell align="center">Ngày khởi tạo</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        {vouchers.length > 0 && <TableBody>
                            {vouchers.map((voucher) => {
                                // if (voucher.phoneNumber.includes(searchPattern)) {
                                return <TableRow key={voucher._id} >
                                    <TableCell align="center">{voucher.owner.phoneNumber}</TableCell>
                                    <TableCell align="center">{voucher.type === 0 ? voucher.donator.phoneNumber : ''}</TableCell>
                                    <TableCell align="center">{voucher.type === 0 ? "Thẻ được tặng" : "Thẻ sở hữu"}</TableCell>
                                    <TableCell align="center">{(new Date(voucher.createdAt)).toLocaleDateString()}</TableCell>
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
            </div>
        </div >
    )
}

export default withRouter(connector(ListVouchers));