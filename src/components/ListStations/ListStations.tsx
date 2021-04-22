import React, { useEffect, useState } from "react";
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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import BarChartIcon from '@material-ui/icons/BarChart';
import Add from '@material-ui/icons/Add';
import { Button, IconButton, TextField } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import RouterProps from '../../types/RouterProps.type';

import StationDetails from "../../types/Station.type";
import { RootState } from "../../reducers/root.reducer";
import { fetchListStations, deleteStation } from "../../reducers/station.reducer"
import { getUsers } from "../../reducers/user.reducer";
import AddStationDialog from "./AddStationDialog";
import EditStationDialog from "./EditStationDialog";
import BarChart from './BarChart';

import '../../styles/components/ListStations/ListStations.scss';

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
    const [chartDialog, setChartDialog] = useState(false);
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

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        fetchListStations();
        getUsers();
    }, []);

    const openChartDialog = () => {
        setChartDialog(true);
    }

    const closeChartDialog = () => {
        setChartDialog(false);
    }

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
        if (window.confirm(`Bạn có muốn xoá cây xăng ${station.name} không?`)) {
            deleteStation(station._id);
        };
    }

    const [searchPattern, changeSearchPattern] = useState('');

    return (
        <div className='container'>
            <SideBar history={history} />
            <div className='content'>
                <div className='ListStations__header'>
                    <div className="search-view">
                        <TextField
                            variant="outlined"
                            label="Tìm cây xăng theo tên"
                            className="ListStations__search-stations"
                            value={searchPattern}
                            onChange={(e) => changeSearchPattern(e.target.value)}
                        />

                    </div>
                    <div className="ListStations__buttons-custom">
                        <Button className='ListStations__buttons' onClick={openChartDialog} ><BarChartIcon /></Button>
                    </div>
                    <div className="ListStations__buttons-custom">
                        <Button className='ListStations__buttons' onClick={openAddStationDialog} ><Add /></Button>
                    </div>
                </div>

                <TableContainer component={Paper}>
                    <Table stickyHeader className='table' aria-label="simple table">
                        <TableHead className='header-table'>
                            <TableRow>
                                <TableCell align="center" className="tableRightBorder">Tên cây xăng</TableCell>
                                <TableCell align="center" className="tableRightBorder">Trạng thái</TableCell>
                                <TableCell align="center" className="tableRightBorder">Địa chỉ</TableCell>
                                <TableCell align="center" className="tableRightBorder">Số lượng trụ xăng</TableCell>
                                <TableCell align="center" className="tableRightBorder">Thời gian hoạt động</TableCell>
                                <TableCell align="center" className="tableRightBorder">Tuỳ chỉnh</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        {stations.length > 0 && <TableBody>
                            {stations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((station) => {
                                if (station.name.toLowerCase().includes(searchPattern.toLowerCase())) {
                                    return <TableRow key={station._id}>
                                        <TableCell align="center" className="tableRightBorder">{station.name}</TableCell>
                                        <TableCell align="center" className="tableRightBorder">{station.isActive ? "Hoạt động" : "Không hoạt động"}</TableCell>
                                        <TableCell align="center" className="tableRightBorder">{station.address}</TableCell>
                                        <TableCell align="center" className="tableRightBorder">{station.total_tank}</TableCell>
                                        <TableCell align="center" className="tableRightBorder">Từ {station.working_hour_from} đến {station.working_hour_to} (GMT+7)</TableCell>
                                        <TableCell align="center" className="tableRightBorder">
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
                                }
                                return null;
                            }
                            )}
                        </TableBody>}
                    </Table>
                </TableContainer>
                <TablePagination
                    labelRowsPerPage="Số dòng mỗi trang: "
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={stations.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
                <div>
                    <BarChart open={chartDialog} onClose={closeChartDialog} />
                </div>
            </div>
            <AddStationDialog open={addStationDialog} onClose={closeAddStationDialog} />
            <EditStationDialog open={editStationDialog} station={selectedStation} onClose={closeEditStationDialog} />
        </div >
    )
}

export default withRouter(connector(ListStations));