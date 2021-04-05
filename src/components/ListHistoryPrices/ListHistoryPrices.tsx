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
                            {prices.map((price) => {
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
            </div>
        </div >
    )
}

export default withRouter(connector(ListUsers));