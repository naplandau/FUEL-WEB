import { useEffect } from "react";
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
import TankDetails from '../../types/Tank.type';
import { updateTank } from '../../reducers/station.reducer';

import '../../styles/components/ListTanks/TankDialog.scss';
import { useState } from 'react';

const stateToProps = (state: RootState) => ({
    station: state.stationReducer.station
})

const dispatchToProps = {
    updateTank,
};

const connector = connect(stateToProps, dispatchToProps);

type BasicProps = {
    tank: TankDetails;
    open: boolean;
    onClose: () => void
}

type TankProps = ConnectedProps<typeof connector> & BasicProps;

const TankDialog = ({
    station,
    tank,
    open,
    onClose,
    updateTank,
}: TankProps) => {
    const [tankPos, setTankPos] = useState(0);
    const [fuelType, setFuelType] = useState('');
    const [error, setError] = useState('');
    const [pools, setPools] = useState([]);


    useEffect(() => {
        if (station) {
            setPools(station.pools);
        }
    }, [station])

    const handleConfirm = () => {
        const errorMessage = validateData();
        setError(errorMessage);

        if (errorMessage) {
            return false;
        }

        updateTank({
            fuel_type: fuelType,
            tank_position: tankPos,
        }, tank._id);
        onClose();
    }

    const validateData = () => {
        const isTankPos = station.tanks.find(tank => tank.tank_position === tankPos);

        if (isTankPos) {
            return 'Vị trí trụ bơm đã tồn tại';
        }

        return '';
    };

    useEffect(() => {
        if (tank) {
            setFuelType(tank.fuel_type);
            setTankPos(tank.tank_position);
        }
    }, [tank])

    return (
        <div className="AddTank">
            <Grid container>
                <Dialog className="AddTank__wrapper" open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                    <DialogTitle className="AddTank__title" id="form-dialog-title">Chỉnh sửa trụ bơm</DialogTitle>
                    <DialogContent style={{
                        flexDirection: 'column'
                    }}>
                        {error && <Typography className="error" variant="body1">{error}</Typography>}
                        <TextField
                            variant='outlined'
                            className="AddTank__text-field"
                            label="Vị trí trụ xăng"
                            value={tankPos}
                            fullWidth
                            onChange={(e) => setTankPos(parseInt(e.target.value))}
                        />
                        <FormControl variant="outlined" className="AddTank__text-field" required>
                            <InputLabel>Chọn loại nhiên liệu</InputLabel>
                            <Select
                                label="Chọn loại nhiên liệu"
                                value={fuelType}
                                onChange={(e: React.ChangeEvent<{ value: unknown }>) => setFuelType(e.target.value as string)}
                            >
                                <MenuItem value={tank.fuel_type}>
                                    <em>{tank.fuel_type}</em>
                                </MenuItem>
                                {
                                    Array.isArray(pools) && pools.filter(pool => pool.type_name !== tank.fuel_type).map((pool) => (
                                        <MenuItem key={pool._id} value={pool.type_name}>{pool.type_name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>

                    </DialogContent>
                    <DialogActions>
                        <Button className="AddTank__buttons AddTank__buttons--secondary"
                            onClick={onClose}
                            color='secondary'>
                            Cancel
                        </Button>
                        <Button className="AddTank__buttons"
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

export default connector(TankDialog);