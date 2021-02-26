import { connect, ConnectedProps } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Grid, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { RootState } from '../../reducers/root.reducer';
import { updateStation } from '../../reducers/station.reducer';

import '../../styles/components/Home/StationDialog.scss';
import { useState } from 'react';
import StationDetails from '../../types/Station.type';

const stateToProps = (state: RootState) => ({
})

const dispatchToProps = {
    updateStation,
};

const connector = connect(stateToProps, dispatchToProps);

type BasicProps = {
    station: StationDetails;
    open: boolean;
    onClose: () => void
}

type StationProps = ConnectedProps<typeof connector> & BasicProps;

const EditStationDialog = ({
    station,
    open,
    onClose,
    updateStation,
}: StationProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [long, setLong] = useState(0);
    const [lat, setLat] = useState(0);
    const [workingHourFrom, setWorkingHourFrom] = useState('');
    const [workingHourTo, setWorkingHourTo] = useState('');
    const [address, setAddress] = useState('');
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
        onClose();
    }

    const validateData = () => {
        if (!name) {
            return "Station's name is required!";
        }
        if (!description) {
            return 'Description is required!';
        }

        if (!address) {
            return 'Address is required!';
        }

        if (!long) {
            return 'Longitude is required!';
        }

        if (!lat) {
            return 'Latitude is required!';
        }

        if (!workingHourTo) {
            return 'Working Hour To is required!';
        }

        if (!workingHourFrom) {
            return 'Working Hour From is required!';
        }

        if (long < -180 || long > 180) {
            return "Longitude's value must be between -180 and 180!";
        }

        if (lat < -90 || lat > 90) {
            return "Latitude's value must be between -180 and 180!";
        }

        return '';
    };

    return (
        <div className="AddStation">
            <Grid container>
                <Dialog className="AddStation__wrapper" open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                    <DialogTitle className="AddStation__title" id="form-dialog-title">Edit Station</DialogTitle>
                    <DialogContent style={{
                        flexDirection: 'column'
                    }}>
                        {error && <Typography className="error" variant="body1">{error}</Typography>}
                        <TextField
                            variant='outlined'
                            className="AddStation__text-field"
                            autoFocus
                            label="Station's name"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            variant='outlined'
                            className="AddStation__text-field"
                            label="Description"
                            value={description}
                            fullWidth
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <TextField
                            variant='outlined'
                            className="AddStation__text-field"
                            label="Address"
                            value={address}
                            fullWidth
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <Grid container spacing={2} style={{ marginTop: '10px' }}>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    className="AddStation__text-field"
                                    type="number"
                                    label="Longitude"
                                    required
                                    value={long}
                                    onChange={(e) => setLong(parseFloat(e.target.value))}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    className="AddStation__text-field"
                                    type="number"
                                    label="Latitude"
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
                                    className="AddStation__text-field "
                                    type="number"
                                    label="Woking Hour From"
                                    required
                                    value={workingHourFrom}
                                    onChange={(e) => setWorkingHourFrom(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    className="AddStation__text-field"
                                    type="number"
                                    label="Woking Hour To"
                                    required
                                    value={workingHourTo}
                                    onChange={(e) => setWorkingHourTo(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button className="AddStation__buttons AddStation__buttons--secondary"
                            onClick={onClose}
                            color='secondary'>
                            Cancel
                        </Button>
                        <Button className="AddStation__buttons"
                            onClick={handleConfirm}
                            color='primary'>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </div>
    )
}

export default connector(EditStationDialog);