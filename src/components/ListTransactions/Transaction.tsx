import { Grid, Typography, Paper } from "@material-ui/core";

import TransactionDetails from "../../types/Transaction.type";

import '../../styles/components/ListTransactions/Transaction.scss';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';

type TransactionProps = {
    transaction: TransactionDetails;
};

const Transaction = ({
    transaction,
}: TransactionProps) => {
    const status = (status: number) => {
        if (status === 10) {
            return 'Thành công';
        }
        else if (status % 2 === 1) {
            return 'Thất bại';
        }
        else return 'Đang tiến hành';
    }
    return (
        <div className='Transaction'>
            <Grid container>
                <Grid item xs={12} sm={8} className="Transaction__wrapper">
                    <Typography variant="h6">
                        {status(transaction.status) === 'Thành công' &&
                            <CheckCircleTwoToneIcon
                                color='primary'
                                fontSize='small'
                            />}
                        {status(transaction.status)}.
                            {(new Date(transaction.updatedAt)).toLocaleDateString()}</Typography>

                    <Typography style={{ fontSize: '18px', fontWeight: 600 }}>{transaction.data.station.data.address}</Typography>
                    <Typography >{transaction.amount.payAmount}đ</Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default Transaction;