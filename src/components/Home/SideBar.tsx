import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../reducers/root.reducer';
import '../../styles/components/Home/SideBar.scss';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import ReceiptIcon from '@material-ui/icons/Receipt';
import HistoryIcon from '@material-ui/icons/History';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import { setSelected, setSideBarSelected } from '../../reducers/sidebar.reducer';
import HistoryProps from "../../types/HistoryProps.type";
import { getMe } from "../../reducers/user.reducer";

const stateToProps = (state: RootState) => ({
    me: state.userReducer.me,
    selected: state.sidebarReducer.selected,
})

const dispatchToProps = {
    setSideBarSelected,
    getMe
};

const connector = connect(stateToProps, dispatchToProps);

type SideBarProps = ConnectedProps<typeof connector> & HistoryProps;

const SideBar = ({
    me,
    history,
    selected,
    getMe,
    setSideBarSelected }: SideBarProps) => {

    useEffect(() => {
        getMe()
    }, [])
    return (
        <div className='sidebar'>
            <div
                className='header'>
                <img alt='logo' className='logo' />
                <p className='title-admin'>Quản trị viên</p>
            </div>
            <img alt='avatar' className='avatar' />
            {/* <p className='name'>{me.name ? me.name : "Họ tên"}</p> */}
            <div style={selected === 0 ? { borderColor: '#e73e3e' } : {}} onClick={() => {
                history.push(`/users`);
                setSideBarSelected(0);
            }} className='sideOptions'>
                <AccountCircle style={Object.assign({}, {
                    width: '5vh',
                    height: '5vh'
                }, selected === 0 ? { color: '#e73e3e' } : {})} className='icon' />
                <p style={selected === 0 ? { color: '#e73e3e' } : {}} className='text'>Quản lý người dùng</p>
            </div>
            <div style={selected === 1 ? { borderColor: '#e73e3e' } : {}} onClick={() => {
                history.push(`/stations`);
                setSideBarSelected(1);
            }} className='sideOptions'>
                <LocalGasStationIcon style={Object.assign({}, {
                    width: '5vh',
                    height: '5vh'
                }, selected === 1 ? { color: '#e73e3e' } : {})} className='icon' />
                <p style={selected === 1 ? { color: '#e73e3e' } : {}} className='text'>Quản lý cây xăng</p>
            </div>
            <div style={selected === 2 ? { borderColor: '#e73e3e' } : {}} onClick={() => {
                history.push(`/transactions`);
                setSideBarSelected(2);
            }} className='sideOptions'>
                <ReceiptIcon style={Object.assign({}, {
                    width: '5vh',
                    height: '5vh'
                }, selected === 2 ? { color: '#e73e3e' } : {})} className='icon' />
                <p style={selected === 2 ? { color: '#e73e3e' } : {}} className='text'>Quản lý hoá đơn</p>
            </div>
            <div style={selected === 3 ? { borderColor: '#e73e3e' } : {}} onClick={() => setSelected(3)} className='sideOptions'>
                <HistoryIcon style={Object.assign({}, {
                    width: '5vh',
                    height: '5vh'
                }, selected === 3 ? { color: '#e73e3e' } : {})} className='icon' />
                <p style={selected === 3 ? { color: '#e73e3e' } : {}} className='text'>Quản lý lịch sử</p>
            </div>
            <div style={selected === 4 ? { borderColor: '#e73e3e' } : {}} onClick={() => setSelected(4)} className='sideOptions'>
                <CardGiftcardIcon style={Object.assign({}, {
                    width: '5vh',
                    height: '5vh'
                }, selected === 4 ? { color: '#e73e3e' } : {})} className='icon' />
                <p style={selected === 4 ? { color: '#e73e3e' } : {}} className='text'>Quản lý thẻ quà tặng</p>
            </div>
        </div>
    )
};

export default connector(SideBar);