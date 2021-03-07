import { useEffect } from "react";
import { connect, ConnectedProps } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Grid, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { RootState } from '../../reducers/root.reducer';
import PoolDetails from '../../types/Pool.type';
import { updatePool } from '../../reducers/station.reducer';

import '../../styles/components/ListPools/PoolDialog.scss';
import { useState } from 'react';

const stateToProps = (state: RootState) => ({
})

const dispatchToProps = {
    updatePool,
};

const connector = connect(stateToProps, dispatchToProps);

type BasicProps = {
    pool: PoolDetails;
    open: boolean;
    onClose: () => void
}

type PoolProps = ConnectedProps<typeof connector> & BasicProps;

const PoolDialog = ({
    pool,
    open,
    onClose,
    updatePool,
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

        updatePool({
            type_name: typeName,
            fuel_amount: fuelAmount,
        }, pool._id);
        onClose();
    }

    const validateData = () => {
        return '';
    };

    useEffect(() => {
        if (pool) {
            setTypeName(pool.type_name);
            setFuelAmount(pool.fuel_amount);
        }
    }, [pool])

    return (
        <div className="AddPool">
            <Grid container>
                <Dialog className="AddPool__wrapper" open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                    <DialogTitle className="AddPool__title" id="form-dialog-title">Chỉnh sửa bồn chứa</DialogTitle>
                    <DialogContent style={{
                        flexDirection: 'column'
                    }}>
                        {error && <Typography className="error" variant="body1">{error}</Typography>}
                        {/* <FormControl variant="outlined" className="AddPool__text-field" required>
                            <InputLabel>Chọn loại nhiên liệu</InputLabel>
                            <Select
                                label="Chọn loại nhiên liệu"
                                value={typeName}
                                onChange={(e: React.ChangeEvent<{ value: unknown }>) => setTypeName(e.target.value as string)}
                            >
                                <MenuItem value="Xăng RON 95-III">Xăng RON 95-III</MenuItem>
                                <MenuItem value="Xăng E5 RON 92-II">Xăng E5 RON 92-II</MenuItem>
                                <MenuItem value="Dầu DO 0,05S-II">Dầu DO 0,05S-II</MenuItem>
                                <MenuItem value="Dầu KO">Dầu KO</MenuItem>
                            </Select>
                        </FormControl> */}
                        <TextField
                            variant='outlined'
                            className="AddPool__text-field"
                            label="Số lượng nhiên liệu (lít)"
                            value={fuelAmount}
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