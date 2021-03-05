import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Add from '@material-ui/icons/Add';
import { Button, IconButton } from "@material-ui/core";

import { RootState } from "../../reducers/root.reducer";

import '../../styles/components/ListStations/StationDetail.scss';

import AddPoolDialog from '../ListPools/AddPoolDialog';
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

    const openAddPoolDialog = () => {
        setAddPoolDialog(true);
    }

    const closeAddPoolDialog = () => {
        setAddPoolDialog(false);
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
        <div>
            <TableContainer>
                <Table stickyHeader className='table' aria-label="simple table">
                    <TableHead className='header-table'>
                        <TableRow>
                            <TableCell align="center">Loại nhiên liệu</TableCell>
                            <TableCell align="center">Lượng nhiên liệu trong bồn</TableCell>
                            <TableCell align="center">Tuỳ chỉnh</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    {pools.length > 0 && <TableBody>
                        {pools.map((pool) => (
                            <TableRow key={pool._id}>
                                <TableCell align="center">{pool.type_name}</TableCell>
                                <TableCell align="center">{pool.fuel_amount}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        color="default"
                                        onClick={() => handleDeletePool(pool)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                    // onClick={() => {
                                    //     history.push(`stations/${station._id}`)
                                    // }}
                                    >
                                        <NavigateNextIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>}
                </Table>
            </TableContainer>
            <Button className='stationDetail__buttons' onClick={openAddPoolDialog} ><Add /></Button>
            <AddPoolDialog open={addPoolDialog} station={station} onClose={closeAddPoolDialog} />
        </div>
    )
}

export default connector(ListPools);