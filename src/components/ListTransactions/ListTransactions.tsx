import { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { withRouter } from "react-router-dom";
import { Typography, Grid, Paper } from "@material-ui/core";

import { RootState } from "../../reducers/root.reducer";
import RouterProps from "../../types/RouterProps.type";

import Transaction from './Transaction';
import SideBar from '../Home/SideBar';

import '../../styles/components/ListTransactions/ListTransactions.scss';

import { fetchListTransactions, clearListTransactions } from '../../reducers/transaction.reducer';

const mapStateToProps = (state: RootState) => ({
    listTransactions: state.transactionReducer.listTransactions,
});

const mapDispatchToProps = {
    fetchListTransactions,
    clearListTransactions
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ListTransactionsProps = ConnectedProps<typeof connector> & RouterProps;

const ListTransactions = ({
    history,
    listTransactions,
    fetchListTransactions,
    clearListTransactions
}: ListTransactionsProps) => {
    useEffect(() => {
        fetchListTransactions();
    }, [])
    return (
        <div className='container'>
            <SideBar history={history} />
            <div className='ListTransactions'>
                <Grid container>
                    {/* <Typography
                        className="title ListTransactions__title"
                        variant="h5"
                    >
                        Danh sách hoá đơn
                            </Typography> */}
                    <Grid item xs={12} sm={12} md={12} lg={12} className="ListTransaction__wrapper">
                        <Paper className='ListTransaction__paper'>

                            {
                                Array.isArray(listTransactions) && listTransactions.map(transaction => {
                                    return <Transaction key={transaction._id} transaction={transaction} />
                                })
                            }
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default withRouter(connector(ListTransactions));