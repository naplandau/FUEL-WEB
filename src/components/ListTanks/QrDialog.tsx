import { useEffect } from "react";
import { connect, ConnectedProps } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Grid, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import QrCode from "qrcode.react";
import GetAppIcon from '@material-ui/icons/GetApp';

import '../../styles/components/ListTanks/QrDialog.scss'

type BasicProps = {
    tankId: string;
    open: boolean;
    onClose: () => void;
}

const QrDialog = ({
    tankId,
    open,
    onClose
}: BasicProps) => {

    const downloadQr = () => {
        const canvas = document.getElementById("downloadQrCode") as HTMLCanvasElement;
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `Qr${tankId}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    return (
        <div className='Qr'>
            <Grid container>
                <Dialog className="Qr__wrapper" open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                    <DialogTitle className="Qr__title" id="form-dialog-title">Qr Code</DialogTitle>
                    <DialogContent style={{
                        flexDirection: 'column'
                    }}>
                        <QrCode
                            id="downloadQrCode"
                            value={tankId} />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            className="Qr__buttons"
                            onClick={downloadQr}
                        >
                            <GetAppIcon />
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </div>
    )
}

export default QrDialog;