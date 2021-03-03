import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from 'react-redux';
import SideBar from '../Home/SideBar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper, Grid, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Add from '@material-ui/icons/Add';
import { Button, IconButton, TextField } from "@material-ui/core";
import { withRouter } from "react-router-dom";

import StationDetails from "../../types/Station.type";
import { RootState } from "../../reducers/root.reducer";
import { fetchStationDetails, resetStation } from "../../reducers/station.reducer"
import { getUsers } from "../../reducers/user.reducer";
import AddStationDialog from "./AddStationDialog";
import EditStationDialog from "./EditStationDialog";
import RouterProps from '../../types/RouterProps.type';

import '../../styles/components/Home/StationDetail.scss';

const statesToProps = (state: RootState) => ({
    selected: state.sidebarReducer.selected,
    station: state.stationReducer.station,
    accessToken: state.authenticationReducer.accessToken,
});

const dispatchToProps = {
    fetchStationDetails,
    resetStation
};

const connector = connect(statesToProps, dispatchToProps);

type StationDetailsProps = ConnectedProps<typeof connector> & RouterProps;

const StationDetail = ({
    station,
    fetchStationDetails,
    resetStation,
    selected,
    accessToken,
    history
}: StationDetailsProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [long, setLong] = useState(0);
    const [lat, setLat] = useState(0);
    const [workingHourFrom, setWorkingHourFrom] = useState('');
    const [workingHourTo, setWorkingHourTo] = useState('');
    const [address, setAddress] = useState('');
    const [tanks, setTanks] = useState([]);
    const [pools, setPools] = useState([]);
    const [stationId, setStationId] = useState('');

    useEffect(() => {
        if (stationId) {
            fetchStationDetails(stationId);
        }

        return () => {
            resetStation();
        }
    }, [stationId, accessToken]);

    useEffect(() => {
        if (history.location.pathname.split('/')[2]) {
            return setStationId(history.location.pathname.split('/')[2])
        }
        setStationId('');
    }, [history.location.pathname]);

    useEffect(() => {
        if (station) {
            setName(station.name);
            setDescription(station.description);
            setLong(station.long);
            setLat(station.lat);
            setAddress(station.address);
            setWorkingHourTo(station.working_hour_to);
            setWorkingHourFrom(station.working_hour_from);
            setTanks(station.tanks);
            setPools(station.pools);
        }
    }, [station]);

    return (
        <div className="container">
            <SideBar history={history} />
            <div className="content">
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} className="stationDetail__wrapper">
                        <Paper className="stationDetail__paper">
                            <TextField
                                variant='outlined'
                                className="StationDetail__text-field"
                                autoFocus
                                label="Tên cây xăng"
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                variant='outlined'
                                className="StationDetail__text-field"
                                label="Mô tả"
                                value={description}
                                fullWidth
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <TextField
                                variant='outlined'
                                className="StationDetail__text-field"
                                label="Địa chỉ"
                                value={address}
                                fullWidth
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <Grid container spacing={2} style={{ marginTop: '10px' }}>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        className="StationDetail__text-field"
                                        type="number"
                                        label="Kinh độ"
                                        required
                                        value={long}
                                        onChange={(e) => setLong(parseFloat(e.target.value))}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        className="StationDetail__text-field"
                                        type="number"
                                        label="Vĩ độ"
                                        required
                                        value={lat}
                                        onChange={(e) => setLat(parseFloat(e.target.value))}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} style={{ marginTop: '10px' }}>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        className="StationDetail__text-field "
                                        type="number"
                                        label="Hoạt động từ"
                                        required
                                        value={workingHourFrom}
                                        onChange={(e) => setWorkingHourFrom(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        className="StationDetail__text-field"
                                        type="number"
                                        label="Hoạt động đến"
                                        required
                                        value={workingHourTo}
                                        onChange={(e) => setWorkingHourTo(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper className="stationDetail__paper">
                            <TableContainer>
                                <Table stickyHeader className='table' aria-label="simple table">
                                    <TableHead className='header-table'>
                                        <TableRow>
                                            <TableCell align="center">Vị trí trụ bơm</TableCell>
                                            <TableCell align="center">Loại xăng/dầu</TableCell>
                                            <TableCell align="center">Tình trạng</TableCell>
                                            <TableCell align="center">Tuỳ chỉnh</TableCell>
                                            <TableCell align="center"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {tanks.length > 0 && <TableBody>
                                        {tanks.map((tank) => (
                                            <TableRow key={tank._id}>
                                                <TableCell align="center">{tank.tank_position}</TableCell>
                                                <TableCell align="center">{tank.fuel_type}</TableCell>
                                                <TableCell align="center">{tank.isActive ? "Hoạt động" : "Không hoạt động"}</TableCell>
                                                <TableCell align="center">
                                                    <IconButton
                                                        color="secondary"
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        color="default"
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
                        </Paper>
                        <Paper className="stationDetail__paper">
                            <TableContainer>
                                <Table stickyHeader className='table' aria-label="simple table">
                                    <TableHead className='header-table'>
                                        <TableRow>
                                            <TableCell align="center">Loại xăng/dầu</TableCell>
                                            <TableCell align="center">Lượng xăng/dầu trong bồn</TableCell>
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
                                                        color="secondary"
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        color="default"
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
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default withRouter(connector(StationDetail));