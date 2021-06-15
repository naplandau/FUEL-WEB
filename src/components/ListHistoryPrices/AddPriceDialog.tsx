import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Grid, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { RootState } from '../../reducers/root.reducer';
import { adminAddPrice } from '../../reducers/price.reducer';
import { fetchFuelPrices } from '../../reducers/station.reducer';
import Price from '../../types/Price.type';

import '../../styles/components/ListHistoryPrices/PriceDialog.scss';

const stateToProps = (state: RootState) => ({
    fuelPrice: state.stationReducer.listPrices,
})

const dispatchToProps = {
    adminAddPrice,
    fetchFuelPrices
};

const connector = connect(stateToProps, dispatchToProps);

type BasicProps = {
    open: boolean;
    onClose: () => void;
}

type Props = ConnectedProps<typeof connector> & BasicProps;

const PriceDialog = ({
    open,
    onClose,
    adminAddPrice,
    fetchFuelPrices,
    fuelPrice
}: Props) => {
    const [price, setPrice] = useState({});

    useEffect(() => {
        fetchFuelPrices();
    }, [])

    useEffect(() => {
        if (fuelPrice) {
            setPrice(fuelPrice);
        }
        return () => {
            setPrice(null);
        }
    }, [fuelPrice]);

    const handleConfirm = () => {
        adminAddPrice({ fuels: price });
    }

    return (
        <div className="AddPrice">
            <Grid container>
                <Dialog className="AddPrice__wrapper" open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                    <DialogTitle className="AddPrice__title" id="form-dialog-title">Thêm giá xăng</DialogTitle>
                    <DialogContent style={{
                        flexDirection: 'column'
                    }}>
                        {/* {error && <Typography className="error" variant="body1">{error}</Typography>} */}
                        <Grid container spacing={2}>
                            {Object.entries(price).map(([key, value]) => {
                                return (<Grid item xs={3}>
                                    <TextField
                                        variant='outlined'
                                        className="AddPrice__text-field"
                                        autoFocus
                                        id={key}
                                        label={key}
                                        value={value ? value : 0}
                                        fullWidth
                                        onChange={(e) => setPrice((prevState: Price): Price => ({ ...prevState, [e.target.id]: parseFloat(e.target.value) }))}
                                    />
                                </Grid>)
                            })}
                        </Grid>
                        
                    </DialogContent>
                    <DialogActions>
                        <Button className="AddPrice__buttons AddPrice__buttons--secondary"
                            onClick={onClose}
                            color='secondary'>
                            Huỷ bỏ
                        </Button>
                        <Button className="AddPrice__buttons"
                            onClick={handleConfirm}
                            color='primary'>
                            Xác nhận
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </div>
    )
}

export default connector(PriceDialog);