import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Grid, Typography, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { RootState } from '../../reducers/root.reducer';
import { createStation } from '../../reducers/station.reducer';
import ExploreTwoToneIcon from '@material-ui/icons/ExploreTwoTone';
import SubVn from 'sub-vn';

import MapDialog from './MapDialog';

import '../../styles/components/ListStations/StationDialog.scss';

type Province = {
    name: string,
    unit: string,
    code: string
}

type District = {
    code: string,
    name: string,
    unit: string,
    province_code: string,
    province_name: string,
    full_name: string
}

const stateToProps = (state: RootState) => ({
    lat: state.stationReducer.lat,
    lng: state.stationReducer.lng
})

const dispatchToProps = {
    createStation,
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
    createStation,
    lat,
    lng,
}: StationProps) => {
    const provinces: Array<Province> = SubVn.getProvinces();
    const [districts, setDistricts] = useState(Array<District>());
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [workingHourFrom, setWorkingHourFrom] = useState('');
    const [workingHourTo, setWorkingHourTo] = useState('');
    const [address, setAddress] = useState('');
    const [province, setProvince] = useState<Province>({
        code: '',
        name: '',
        unit: ''
    });
    const [district, setDistrict] = useState<District>({
        code: '',
        name: '',
        unit: '',
        province_code: '',
        province_name: '',
        full_name: ''
    });

    const [mapDialog, setMapDialog] = useState(false);

    const openMapDialog = () => {
        setMapDialog(true);
    }
    const closeMapDialog = () => {
        setMapDialog(false);
    }

    useEffect(() => {
        if (province) {
           setDistricts(SubVn.getDistrictsByProvinceCode(province.code));
        }
    }, [province])

    const [error, setError] = useState('');

    const handleConfirm = () => {
        const errorMessage = validateData();
        setError(errorMessage);

        if (errorMessage) {
            return false;
        }

        createStation({
            name: name,
            address: address + ', ' + district.full_name + ', ' + province.name,
            description: description,
            long: lng,
            lat: lat,
            working_hour_from: workingHourFrom,
            working_hour_to: workingHourTo
        });
        onClose();
    }

    const validateData = () => {
        if (!name) {
            return "Station's name is required!";
        }
        if (!description) {
            return 'Description is required!';
        }

        if (!province) {
            return 'Province is required!';
        }

        if (!address) {
            return 'Address is required!';
        }

        if (!district) {
            return 'District is required!';
        }

        if (!workingHourTo) {
            return 'Working Hour To is required!';
        }

        if (!workingHourFrom) {
            return 'Working Hour From is required!';
        }

        if (lng < -180 || lng > 180) {
            return "Longitude's value must be between -180 and 180!";
        }

        if (lat < -90 || lat > 90) {
            return "Latitude's value must be between -90 and 90!";
        }

        return '';

    };

    return (
        <div className="AddStation">
            <Grid container>
                <Dialog className="AddStation__wrapper" open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                    <DialogTitle className="AddStation__title" id="form-dialog-title">Cây xăng mới</DialogTitle>
                    <DialogContent style={{
                        flexDirection: 'column'
                    }}>
                        {error && <Typography className="error" variant="body1">{error}</Typography>}
                        <TextField
                            variant='outlined'
                            className="AddStation__text-field"
                            autoFocus
                            label="Tên cây xăng"
                            fullWidth
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            variant='outlined'
                            className="AddStation__text-field"
                            label="Mô tả"
                            fullWidth
                            required
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <TextField
                            variant='outlined'
                            className="AddStation__text-field"
                            label="Địa chỉ"
                            fullWidth
                            required
                            onChange={(e) => setAddress(e.target.value as string)}
                        />
                        <Grid container spacing={2} style={{ marginTop: '10px' }}>
                            <Grid item xs={6}>
                                <FormControl variant="outlined" className="AddPool__text-field" required>
                                    <InputLabel>Chọn tỉnh thành</InputLabel>
                                    <Select
                                        label="Chọn tỉnh thành"
                                        onChange={(e: React.ChangeEvent<{ value: unknown }>) => setProvince(e.target.value as Province)}
                                    >
                                        {provinces.map((province: any) => {
                                            return <MenuItem key={province.id} value={province}>{province.name}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant="outlined" className="AddPool__text-field" required>
                                    <InputLabel>Chọn quận huyện</InputLabel>
                                    <Select
                                        label="Chọn quận/huyện"
                                        onChange={(e: React.ChangeEvent<{ value: unknown }>) => setDistrict(e.target.value as District)}
                                    >
                                        {districts.map((district: any) => {
                                            return <MenuItem key={district.id} value={district}>{district.full_name}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} style={{ marginTop: '10px' }}>
                            <Grid item xs={5}>
                                <TextField
                                    variant="outlined"
                                    className="AddStation__text-field"
                                    type="number"
                                    label="Kinh độ"
                                    value={lng}
                                    required
                                    //onChange={(e) => setLong(parseFloat(e.target.value))}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    variant="outlined"
                                    className="AddStation__text-field"
                                    type="number"
                                    label="Vĩ độ"
                                    value={lat}
                                    required
                                    //onChange={(e) => setLat(parseFloat(e.target.value))}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Button onClick={openMapDialog}>
                                    <ExploreTwoToneIcon/>
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} style={{ marginTop: '10px' }}>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    className="AddStation__text-field "
                                    type="time"
                                    label="Hoạt động từ"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    required
                                    onChange={(e) => setWorkingHourFrom(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    className="AddStation__text-field"
                                    type="time"
                                    label="Hoạt động đến"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    required
                                    onChange={(e) => setWorkingHourTo(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button className="AddStation__buttons AddStation__buttons--secondary"
                            onClick={onClose}
                            color='secondary'>
                            Huỷ bỏ
                        </Button>
                        <Button className="AddStation__buttons"
                            onClick={handleConfirm}
                            color='primary'>
                            Xác nhận
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
            <div>
                <MapDialog open={mapDialog} onClose={closeMapDialog} />
                </div>
        </div>
    )
}

export default connector(StationDialog);