import { connect, ConnectedProps } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Grid, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';
import { RootState } from '../../reducers/root.reducer';
import { createPool, fetchFuelPrices } from '../../reducers/station.reducer';


import '../../styles/components/ListPools/PoolDialog.scss';
import { useState, useEffect } from 'react';
import StationDetails from '../../types/Station.type';

const stateToProps = (state: RootState) => ({
    listFuelPrice: state.stationReducer.listPrices
})


const dispatchToProps = {
    createPool,
    fetchFuelPrices
};

const connector = connect(stateToProps, dispatchToProps);

type BasicProps = {
    open: boolean;
    onClose: () => void;
    station: StationDetails;
}

type PoolProps = ConnectedProps<typeof connector> & BasicProps;

const PoolDialog = ({
    station,
    listFuelPrice,
    open,
    onClose,
    createPool,
    fetchFuelPrices
}: PoolProps) => {
    const [typeName, setTypeName] = useState('');
    const [fuelAmount, setFuelAmount] = useState(0);
    const [error, setError] = useState('');

    const handleConfirm = () => {
        const errorMessage = validateData();
        setError(errorMessage);

        if (errorMessage) {
            return false;
        }

        createPool({
            station_id: station._id,
            type_name: typeName,
            fuel_amount: fuelAmount
        });
        onClose();
    }
    useEffect(() => {
        fetchFuelPrices();
    }, [])

    const validateData = () => {
        if (!typeName) {
            return "Điền vào kiểu nhiên liệu!";
        }
        if (fuelAmount < 0) {
            return 'Điền vào số lượng nhiên liệu (lít)!';
        }

        const isPoolExist = station.pools.find(pool => pool.type_name === typeName);

        if (isPoolExist) {
            return 'Kiểu nhiên liệu đã tồn tại';
        }

        return '';
    };

    return (
        <div className="AddPool">
            <Grid container>
                <Dialog className="AddPool__wrapper" open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                    <DialogTitle className="AddPool__title" id="form-dialog-title">Bồn chứa mới</DialogTitle>
                    <DialogContent style={{
                        flexDirection: 'column'
                    }}>
                        {error && <Typography className="error" variant="body1">{error}</Typography>}
                        <FormControl variant="outlined" className="AddPool__text-field" required>
                            <InputLabel>Chọn loại nhiên liệu</InputLabel>
                            <Select
                                label="Chọn loại nhiên liệu"
                                onChange={(e: React.ChangeEvent<{ value: unknown }>) => setTypeName(e.target.value as string)}
                            >
                                {Object.keys(listFuelPrice).map((key) => {
                                    return <MenuItem value={key}>{key}</MenuItem>
                                })}

                                {/* <MenuItem value="Xăng E5 RON 92-II">Xăng E5 RON 92-II</MenuItem>
                                <MenuItem value="Dầu DO 0,05S-II">Dầu DO 0,05S-II</MenuItem>
                                <MenuItem value="Dầu KO">Dầu KO</MenuItem> */}

                            </Select>
                        </FormControl>

                        <TextField
                            variant='outlined'
                            className="AddPool__text-field"
                            autoFocus
                            label="Số lượng nhiên liệu (lít)"
                            fullWidth
                            onChange={(e) => setFuelAmount(parseFloat(e.target.value))}
                        />


                    </DialogContent>
                    <DialogActions>
                        <Button className="AddPool__buttons AddPool__buttons--secondary"
                            onClick={onClose}
                            color='secondary'>
                            Cancel
                        </Button>
                        <Button className="AddPool__buttons"
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

export default connector(PoolDialog);