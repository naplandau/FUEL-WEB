import { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";

import { RootState } from "../../reducers/root.reducer";
import RouterProps from "../../types/RouterProps.type";

import Transaction from './Transaction';
import SideBar from '../Home/SideBar';

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
            <div>
                {
                    Array.isArray(listTransactions) && listTransactions.map(transaction => {
                        return <Transaction key={transaction._id} transaction={transaction} />
                    })
                }
            </div>
        </div>
    )
}

export default withRouter(connector(ListTransactions));