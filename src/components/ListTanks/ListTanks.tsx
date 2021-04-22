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
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Add from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { Button, IconButton, Paper, TextField } from "@material-ui/core";
import { Icon, InlineIcon } from '@iconify/react';
import qrcodeIcon from '@iconify-icons/mdi/qrcode';


import { RootState } from "../../reducers/root.reducer";

import '../../styles/components/ListTanks/ListTanks.scss';

import AddTankDialog from '../ListTanks/AddTankDialog';
import EditTankDialog from '../ListTanks/EditTankDialog';
import QrDialog from '../ListTanks/QrDialog';
import StationDetails from "../../types/Station.type";
import TankDetails from '../../types/Tank.type';
import { deleteTank } from '../../reducers/station.reducer';

const statesToProps = (state: RootState) => ({
});

const dispatchToProps = {
    deleteTank
};

type BasicProps = {
    station: StationDetails
}

const connector = connect(statesToProps, dispatchToProps);

type ListTanksProps = ConnectedProps<typeof connector> & BasicProps;

const ListTanks = ({
    station,
    deleteTank }: ListTanksProps) => {
    const [addTankDialog, setAddTankDialog] = useState(false);
    const [tanks, setTanks] = useState([]);
    const [editTankDialog, setEditTankDialog] = useState(false);
    const [qrDialog, setQrDialog] = useState(false);
    const [selectedTankId, setSelectedTankId] = useState('');
    const [selectedTank, setSelectedTank] = useState<TankDetails>({
        _id: '',
        station_id: '',
        tank_position: 0,
        fuel_type: null,
        isActive: false,
    })

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const openAddTankDialog = () => {
        setAddTankDialog(true);
    }

    const closeAddTankDialog = () => {
        setAddTankDialog(false);
    }

    const openEditTankDialog = (tank: TankDetails) => {
        setSelectedTank(tank);
        setEditTankDialog(true);
    }

    const closeEditTankDialog = () => {
        setEditTankDialog(false);
    }

    const openQrDialog = (tankId: string) => {
        setSelectedTankId(tankId);
        setQrDialog(true);
    }

    const closeQrDialog = () => {
        setQrDialog(false);
    }

    useEffect(() => {
        if (station) {
            setTanks(station.tanks);
        }
    }, [station]);

    const handleDeleteTank = (tank: TankDetails) => {
        if (window.confirm(`Are you sure you want to delete tank in position ${tank.tank_position}?`)) {
            deleteTank(tank._id);
        };
    }

    return (
        <div className='content'>
            <div className='ListTanks__header'>
                <div className='ListTanks__label'>
                    Danh sách trụ bơm
                </div>
                <div className="ListTanks__search-tanks">
                    <TextField
                        variant="outlined"
                        label="Tìm theo vị trí trụ bơm"

                    // value={searchPattern}
                    // onChange={(e) => changeSearchPattern(e.target.value)}
                    />
                </div>
                <div className='ListTanks__buttons-custom'>
                    <Button className='ListTanks__buttons' onClick={openAddTankDialog} ><Add /></Button>
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table stickyHeader className='table' aria-label="simple table">
                    <TableHead className='header-table'>
                        <TableRow>
                            <TableCell align="center" className="tableRightBorder">Vị trí trụ bơm</TableCell>
                            <TableCell align="center" className="tableRightBorder">Loại xăng/dầu</TableCell>
                            <TableCell align="center" className="tableRightBorder">Tình trạng</TableCell>
                            <TableCell align="center" className="tableRightBorder">Tuỳ chỉnh</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    {tanks.length > 0 && <TableBody>
                        {tanks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((tank) => (
                            <TableRow key={tank._id}>
                                <TableCell align="center" className="tableRightBorder">{tank.tank_position}</TableCell>
                                <TableCell align="center" className="tableRightBorder">{tank.fuel_type}</TableCell>
                                <TableCell align="center" className="tableRightBorder">{tank.isActive ? "Hoạt động" : "Không hoạt động"}</TableCell>
                                <TableCell align="center" className="tableRightBorder">
                                    <IconButton
                                        onClick={() => openEditTankDialog(tank)}
                                        color="secondary"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="default"
                                        onClick={() => handleDeleteTank(tank)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        onClick={() => openQrDialog(tank._id)}
                                    >
                                        <Icon icon={qrcodeIcon} />
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
                count={tanks.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <AddTankDialog open={addTankDialog} onClose={closeAddTankDialog} />
            <EditTankDialog open={editTankDialog} tank={selectedTank} onClose={closeEditTankDialog} />
            <QrDialog open={qrDialog} tankId={selectedTankId} onClose={closeQrDialog} />
        </div>
    )
}

export default connector(ListTanks);