import { connect, ConnectedProps } from 'react-redux';
import Button from '@material-ui/core/Button';
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
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import { setLng, setLat } from '../../reducers/station.reducer'
import currentIcon from '../../assets/current-location.svg';

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

const libraries: Libraries = ["places"];

const stateToProps = (state: RootState) => ({
})

const dispatchToProps = {
    setLng,
    setLat
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
    setLng,
    setLat,
}: StationProps) => {
    
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: googleConfig.googleApiKey,
        libraries,
    });

    const [curLocation, getCurLocation] = useState({
        lat: 0.0,
        lng: 0.0,
    });
    const [selected, setSelected] = useState(null);
    const [marker, setMarker] = useState({
        lat: 0.0,
        lng: 0.0,
    });

    const handleConfirm = () => {
        setLat(selected.lat);
        setLng(selected.lng);
        onClose();
    }

    navigator?.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: lng } }) => {
        const pos = { lat, lng };
        getCurLocation(pos);
    }); 

    const mapRef = useRef(null);
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const options = {
        zoomControl: true
    }

    return (
        <div className="AddStation">
            <Grid container>
                <Dialog className="AddStation__wrapper" open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                    <DialogActions>
                        <GoogleMap
                            mapContainerStyle={{ height: '70vh', width: '100vw' }}
                            onLoad={onMapLoad}
                            zoom={17}
                            center={curLocation}
                            options={options}
                            onClick={(e) => {
                                setMarker({
                                    lat: e.latLng.lat(),
                                    lng: e.latLng.lng(),
                                });
                            }}
                        >
                            <Marker
                                position={{ lat: curLocation.lat, lng: curLocation.lng }}
                                
                            />
                            <Marker
                                position={{ lat: marker.lat, lng: marker.lng }}
                                onClick={(e) => {
                                    setSelected(marker);
                                }}
                            />

                            {selected ? (<InfoWindow
                                position={{ lat: selected.lat, lng: selected.lng }}
                                onCloseClick={() => {
                                    setSelected(null);
                                }}
                            >
                                <h4>Toạ độ: ({selected.lat}, {selected.lng})</h4>
                            </InfoWindow>)
                                : null
                            }
                        </GoogleMap>
                    </DialogActions>
                    <Button className="AddStation__buttons"
                        onClick={handleConfirm}
                        color='primary'>
                        Chọn toạ độ
                        </Button>
                </Dialog>
            </Grid>
        </div>
    )
}

export default connector(StationDialog);