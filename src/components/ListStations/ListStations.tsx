import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from 'react-redux';
import SideBar from '../Home/SideBar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Add from '@material-ui/icons/Add';
import { Button, IconButton } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import RouterProps from '../../types/RouterProps.type';

import StationDetails from "../../types/Station.type";
import { RootState } from "../../reducers/root.reducer";
import { fetchListStations, deleteStation } from "../../reducers/station.reducer"
import { getUsers } from "../../reducers/user.reducer";
import AddStationDialog from "./AddStationDialog";
import EditStationDialog from "./EditStationDialog";

import '../../styles/components/Home/Home.scss';

const statesToProps = (state: RootState) => ({
    stations: state.stationReducer.listStations,
});

const dispatchToProps = {
    fetchListStations,
    deleteStation,
};

const connector = connect(statesToProps, dispatchToProps);

type ListStationsProps = ConnectedProps<typeof connector> & RouterProps;

const ListStations = ({
    history,
    stations,
    fetchListStations,
    deleteStation }: ListStationsProps) => {
    const [addStationDialog, setAddStationDialog] = useState(false);
    const [editStationDialog, setEditStationDialog] = useState(false);
    const [selectedStation, setSelectedStation] = useState<StationDetails>({
        isActive: false,
        description: '',
        total_tank: null,
        available_tanks: null,
        _id: '',
        name: '',
        address: '',
        long: null,
        lat: null,
        working_hour_from: '',
        working_hour_to: '',
        tanks: [{
            _id: '',
            station_id: '',
            tank_position: null,
            fuel_type: null,
            isActive: false,
        }],
        pools: [{
            _id: '',
            station_id: '',
            fuel_amount: null,
            type_name: '',
        }],
        createdAt: '',
        updatedAt: '',
    })

    useEffect(() => {
        fetchListStations();
        getUsers();
    }, []);

    const openAddStationDialog = () => {
        setAddStationDialog(true);
    }

    const closeAddStationDialog = () => {
        setAddStationDialog(false);
    }

    const openEditStationDialog = (station: StationDetails) => {
        setSelectedStation(station);
        setEditStationDialog(true);
    }

    const closeEditStationDialog = () => {
        setEditStationDialog(false);
    }

    const handleDeleteStation = (station: StationDetails) => {
        if (window.confirm(`Are you sure you want to delete ${station.name}?`)) {
            deleteStation(station._id);
        };
    }

    console.log(stations)

    return (
        <div className='container'>
            <SideBar history={history} />
            <div className='content'>
                <TableContainer component={Paper}>
                    <Table stickyHeader className='table' aria-label="simple table">
                        <TableHead className='header-table'>
                            <TableRow>
                                <TableCell align="center">Tên cây xăng</TableCell>
                                <TableCell align="center">Mô tả</TableCell>
                                <TableCell align="center">Số lượng trụ xăng</TableCell>
                                <TableCell align="center">Địa chỉ</TableCell>
                                <TableCell align="center">Thời gian hoạt động</TableCell>
                                <TableCell align="center">Trạng thái</TableCell>
                                <TableCell align="center">Tuỳ chỉnh</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        {stations.length > 0 && <TableBody>
                            {stations.map((station) => (
                                <TableRow key={station._id}>
                                    <TableCell align="center">{station.name}</TableCell>
                                    <TableCell align="center">{station.description}</TableCell>
                                    <TableCell align="center">{station.total_tank}</TableCell>
                                    <TableCell align="center">{station.address}</TableCell>
                                    <TableCell align="center">Từ {station.working_hour_from} đến {station.working_hour_to} (GMT+7)</TableCell>
                                    <TableCell align="center">{station.isActive ? "Hoạt động" : "Không hoạt động"}</TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            onClick={() => openEditStationDialog(station)}
                                            color="secondary"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleDeleteStation(station)}
                                            color="default"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            onClick={() => {
                                                history.push(`stations/${station._id}`)
                                            }}
                                        >
                                            <NavigateNextIcon />
                                        </IconButton>

                                    </TableCell>
                                </TableRow>
                            )
                            )}
                        </TableBody>}
                    </Table>
                </TableContainer>
                <div className="Home__buttons-custom">
                    <Button className='Home__buttons' onClick={openAddStationDialog} ><Add /></Button>
                </div>
            </div>
            <AddStationDialog open={addStationDialog} onClose={closeAddStationDialog} />
            <EditStationDialog open={editStationDialog} station={selectedStation} onClose={closeEditStationDialog} />
        </div>
    )
}

export default withRouter(connector(ListStations));