import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from 'react-redux';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ImportContacts from '@material-ui/icons/ImportContacts';
import CategoryOutlined from '@material-ui/icons/CategoryOutlined';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Add from '@material-ui/icons/Add';
import EditOutlined from '@material-ui/icons/EditOutlined';
import LockOutlined from '@material-ui/icons/LockOutlined';
import LockOpenOutlined from '@material-ui/icons/LockOpenOutlined';
import { Button, IconButton, TextField } from "@material-ui/core";

import paths from "../../configs/paths.config";
import HistoryProps from "../../types/HistoryProps.type";
import { RootState } from "../../reducers/root.reducer";
import { fetchListStations } from "../../reducers/station.reducer"

import '../../styles/Home/Home.scss';

const statesToProps = (state: RootState) => ({
    stations: state.stationReducer.listStations,
});

const dispatchToProps = {
    fetchListStations,
};

const connector = connect(statesToProps, dispatchToProps);

type HomeProps = ConnectedProps<typeof connector> & HistoryProps;

const Home = ({ stations, fetchListStations }: HomeProps) => {
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        fetchListStations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='container'>
            <div className='sidebar'>
                <div
                    className='header'>
                    <img alt='logo' className='logo' />
                    <p className='title-admin'>Administrator</p>
                </div>
                <img alt='avatar' className='avatar' />
                <p className='name'>fullname</p>
                <div style={selected === 0 ? { borderColor: '#e73e3e' } : {}} onClick={() => setSelected(0)} className='sideOptions'>
                    <AccountCircle style={Object.assign({}, {
                        width: '5vh',
                        height: '5vh'
                    }, selected === 0 ? { color: '#e73e3e' } : {})} className='icon' />
                    <p style={selected === 0 ? { color: '#e73e3e' } : {}} className='text'>Users</p>
                </div>
                <div style={selected === 1 ? { borderColor: '#e73e3e' } : {}} onClick={() => setSelected(1)} className='sideOptions'>
                    <ImportContacts style={Object.assign({}, {
                        width: '5vh',
                        height: '5vh'
                    }, selected === 1 ? { color: '#e73e3e' } : {})} className='icon' />
                    <p style={selected === 1 ? { color: '#e73e3e' } : {}} className='text'>Courses</p>
                </div>
                <div style={selected === 2 ? { borderColor: '#e73e3e' } : {}} onClick={() => setSelected(2)} className='sideOptions'>
                    <CategoryOutlined style={Object.assign({}, {
                        width: '5vh',
                        height: '5vh'
                    }, selected === 2 ? { color: '#e73e3e' } : {})} className='icon' />
                    <p style={selected === 2 ? { color: '#e73e3e' } : {}} className='text'>Categories</p>
                </div>
            </div>
            <div className='content'>

            </div>
        </div>
    )
}

export default Home;