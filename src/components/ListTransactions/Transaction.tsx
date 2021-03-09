import { Button, Grid, Typography } from "@material-ui/core";

import TransactionDetails from "../../types/Transaction.type";

import '../../styles/components/ListTransactions/Transaction.scss';

type TransactionProps = {
    transaction: TransactionDetails;
};

const Transaction = ({
    transaction,
}: TransactionProps) => {
    return (
        <div>
            <Grid container>
                <div style={{ flexGrow: 1 }}>
                    <Typography variant="h6">{transaction.status}</Typography>
                    <div className="TeacherCourse__price">
                        <Typography style={{ fontSize: '18px', fontWeight: 600 }}>${transaction.data.station.address}</Typography> &nbsp;&nbsp;
                            <Typography style={{ textDecoration: 'line-through' }}>${transaction.amount.payAmount}</Typography>
                    </div>
                    <Typography>Last updated at: {(new Date(transaction.updatedAt)).toLocaleDateString()}</Typography>
                </div>
            </Grid>
        </div>
    )
}

export default Transaction;