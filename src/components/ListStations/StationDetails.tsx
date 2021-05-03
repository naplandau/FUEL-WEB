import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from 'react-redux';
import SideBar from '../Home/SideBar';
import { Paper, Grid, Typography } from '@material-ui/core';
import { Button, TextField } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import loading from '../../assets/loadings/medium.loading.gif';

import { RootState } from "../../reducers/root.reducer";
import { fetchStationDetails, resetStation, updateStation } from "../../reducers/station.reducer"
import RouterProps from '../../types/RouterProps.type';

import '../../styles/components/ListStations/StationDetail.scss';

import ListTanks from '../ListTanks/ListTanks';
import ListPools from '../ListPools/ListPools';

const statesToProps = (state: RootState) => ({
    station: state.stationReducer.station,
    accessToken: state.authenticationReducer.accessToken,
    isFetchingStation: state.stationReducer.isFetchingStation
});

const dispatchToProps = {
    fetchStationDetails,
    resetStation,
    updateStation
};

const connector = connect(statesToProps, dispatchToProps);

type StationDetailsProps = ConnectedProps<typeof connector> & RouterProps;

const StationDetail = ({
    station,
    fetchStationDetails,
    updateStation,
    resetStation,
    accessToken,
    history,
    isFetchingStation
}: StationDetailsProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [long, setLong] = useState(0);
    const [lat, setLat] = useState(0);
    const [workingHourFrom, setWorkingHourFrom] = useState('');
    const [workingHourTo, setWorkingHourTo] = useState('');
    const [address, setAddress] = useState('');
    const [stationId, setStationId] = useState('');
    const [error, setError] = useState('');

    const handleConfirm = () => {
        const errorMessage = validateData();
        setError(errorMessage);

        if (errorMessage) {
            return false;
        }

        updateStation({
            name: name,
            address: address,
            description: description,
            long: long,
            lat: lat,
            working_hour_from: workingHourFrom,
            working_hour_to: workingHourTo
        }, station._id);

        window.alert("Update station success");
    }

    const validateData = () => {

        if (long < -180 || long > 180) {
            return "Longitude's value must be between -180 and 180!";
        }

        if (lat < -90 || lat > 90) {
            return "Latitude's value must be between -180 and 180!";
        }

        return '';
    };


    useEffect(() => {
        if (stationId) {
            fetchStationDetails(stationId);
        }

        return () => {
            resetStation();
        }
    }, [stationId, accessToken, fetchStationDetails, resetStation]);

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
        }
    }, [station]);

    if (isFetchingStation) {
        return (
            <div style={{ width: 150, margin: 'auto' }}>
                <img src={loading} alt="Loading..." />
            </div>
        );
    }

    console.log(station);

    return (
        <div className="container">
            <SideBar history={history} />
            <div className="content">
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} className="stationDetail__wrapper">
                        {error && <Typography className="error" variant="body1">{error}</Typography>}
                        <Paper className="stationDetail__paper">
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        variant='outlined'
                                        className="StationDetail__text-field"
                                        autoFocus
                                        label="Tên cây xăng"
                                        fullWidth
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant='outlined'
                                        className="StationDetail__text-field"
                                        label="Địa chỉ"
                                        value={address}
                                        fullWidth
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <TextField
                                variant='outlined'
                                className="StationDetail__text-field"
                                label="Mô tả"
                                value={description}
                                fullWidth
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <Grid container spacing={2} style={{ marginTop: '10px' }}>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        className="StationDetail__text-field"
                                        type="number"
                                        label="Kinh độ"
                                        value={long}
                                        onChange={(e) => setLong(parseFloat(e.target.value))}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        className="StationDetail__text-field"
                                        type="number"
                                        label="Vĩ độ"
                                        value={lat}
                                        onChange={(e) => setLat(parseFloat(e.target.value))}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        className="StationDetail__text-field "
                                        type="time"
                                        label="Hoạt động từ"
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        value={workingHourFrom}
                                        onChange={(e) => setWorkingHourFrom(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        className="StationDetail__text-field"
                                        type="time"
                                        label="Hoạt động đến"
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        value={workingHourTo}
                                        onChange={(e) => setWorkingHourTo(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                        <div className='StationDetail__button-paper'>
                            <Button className="stationDetail__buttons"
                                onClick={handleConfirm}
                                color='primary'>
                                Cập nhật
                            </Button>
                        </div>
                        <ListTanks station={station} />
                        <ListPools station={station} />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default withRouter(connector(StationDetail));