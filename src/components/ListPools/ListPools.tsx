import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import DeleteIcon from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { Button, IconButton, Paper, TextField } from "@material-ui/core";

import { RootState } from "../../reducers/root.reducer";

import '../../styles/components/ListPools/ListPools.scss';

import AddPoolDialog from '../ListPools/AddPoolDialog';
import EditPoolDialog from '../ListPools/EditPoolDialog';
import StationDetails from '../../types/Station.type';
import PoolDetails from '../../types/Pool.type';
import { deletePool } from '../../reducers/station.reducer';

const statesToProps = (state: RootState) => ({
});

const dispatchToProps = {
    deletePool
};

type BasicProps = {
    station: StationDetails
}

const connector = connect(statesToProps, dispatchToProps);

type ListPoolsProps = ConnectedProps<typeof connector> & BasicProps;

const ListPools = ({
    station,
    deletePool }: ListPoolsProps) => {
    const [addPoolDialog, setAddPoolDialog] = useState(false);
    const [pools, setPools] = useState([]);
    const [editPoolDialog, setEditPoolDialog] = useState(false);
    const [selectedPool, setSelectedPool] = useState<PoolDetails>({
        _id: '',
        station_id: '',
        fuel_amount: null,
        type_name: '',
    });

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const openAddPoolDialog = () => {
        setAddPoolDialog(true);
    }

    const closeAddPoolDialog = () => {
        setAddPoolDialog(false);
    }

    const openEditPoolDialog = (pool: PoolDetails) => {
        setSelectedPool(pool);
        setEditPoolDialog(true);
    }

    const closeEditPoolDialog = () => {
        setEditPoolDialog(false);
    }

    useEffect(() => {
        if (station) {
            setPools(station.pools);
        }
    }, [station]);

    const handleDeletePool = (pool: PoolDetails) => {
        if (window.confirm(`Are you sure you want to delete ${pool.type_name}?`)) {
            deletePool(pool._id);
        };
    }

    return (
        <div className='content'>
            <div className='ListPools__header'>
                <div className='ListTanks__label'>
                    Danh sách bồn chứa
                </div>
                <div className="ListPools__search-pools">
                    <TextField
                        variant="outlined"
                        label="Tìm theo loại nhiên liệu"
                    // value={searchPattern}
                    // onChange={(e) => changeSearchPattern(e.target.value)}
                    />
                </div>
                <div className='ListPools__buttons-custom'>
                    <Button className='ListPools__buttons' onClick={openAddPoolDialog} ><Add /></Button>
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table stickyHeader className='table' aria-label="simple table">
                    <TableHead className='header-table'>
                        <TableRow>
                            <TableCell align="center" className="tableRightBorder">Loại nhiên liệu</TableCell>
                            <TableCell align="center" className="tableRightBorder">Lượng nhiên liệu trong bồn</TableCell>
                            <TableCell align="center">Tuỳ chỉnh</TableCell>
                        </TableRow>
                    </TableHead>
                    {pools.length > 0 && <TableBody>
                        {pools.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((pool) => (
                            <TableRow key={pool._id}>
                                <TableCell align="center" className="tableRightBorder">{pool.type_name}</TableCell>
                                <TableCell align="center" className="tableRightBorder">{pool.fuel_amount}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        onClick={() => openEditPoolDialog(pool)}
                                        color="secondary"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="default"
                                        onClick={() => handleDeletePool(pool)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>}
                </Table>
            </TableContainer>
            <TablePagination
                height="150px"
                labelRowsPerPage="Số dòng mỗi trang: "
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={pools.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <AddPoolDialog open={addPoolDialog} station={station} onClose={closeAddPoolDialog} />
            <EditPoolDialog open={editPoolDialog} pool={selectedPool} onClose={closeEditPoolDialog} />
        </div>
    )
}

export default connector(ListPools);