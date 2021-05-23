import { connect, ConnectedProps } from 'react-redux';
import Button from '@material-ui/core/Button';
import usePlacesAutoComplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { GoogleMap, LoadScript, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api';
import { useState, useCallback, memo, useRef } from 'react';
import { RootState } from '../../reducers/root.reducer';
import googleConfig from '../../configs/googleApi.config';

import '../../styles/components/ListStations/MapDialog.scss';

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
    ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const stateToProps = (state: RootState) => ({
})

const dispatchToProps = {
};

const connector = connect(stateToProps, dispatchToProps);

type BasicProps = {
    open: boolean;
    onClose: () => void
}

type StationProps = ConnectedProps<typeof connector> & BasicProps;

const StationDialog = ({
    open,
    onClose,
}: StationProps) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: googleConfig.googleApiKey,
        libraries: ["places"]
    });
    const [curLocation, getCurLocation] = useState({});
    navigator?.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: lng } }) => {
        const pos = { lat, lng };
        getCurLocation(pos);
    }); 

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    },[])

    const Search = () => {
        const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutoComplete({
            requestOptions: {
                location: curLocation,
                radius: 200 * 1000
            }
        });
        return (
            <div className="search">
                <Combobox onSelect={(address) =>
                    console.log(address)}>
                    <ComboboxInput
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                        disabled={!ready}
                        placeholder="Nhập địa chỉ"
                    />
                    <ComboboxPopover>
                        {status === "OK" && data.map(({ id, description }) =>
                            <ComboboxOption id={id} value={description} />
                        )}
                    </ComboboxPopover>
                </Combobox>
            </div>
        );
    };
    return (
        <div className="AddStation">
            <Grid container>
                <Dialog className="AddStation__wrapper" open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                    <DialogActions>
                        <Search/>
                        <GoogleMap
                            mapContainerStyle={{ height: '70vh', width: '100vw' }}
                            onLoad={onMapLoad}
                            zoom={17}
                            center={curLocation}
                        >
                            <Marker position={curLocation} />
                        </GoogleMap>
                    </DialogActions>
                </Dialog>
            </Grid>
        </div>
    )
}

export default connector(StationDialog);