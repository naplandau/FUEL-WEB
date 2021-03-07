import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../reducers/root.reducer';
import '../../styles/components/Home/Home.scss';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import ReceiptIcon from '@material-ui/icons/Receipt';
import HistoryIcon from '@material-ui/icons/History';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import { setSelected, setSideBarSelected } from '../../reducers/sidebar.reducer';
import HistoryProps from "../../types/HistoryProps.type";

const stateToProps = (state: RootState) => ({
    selected: state.sidebarReducer.selected,
})

const dispatchToProps = {
    setSideBarSelected
};

const connector = connect(stateToProps, dispatchToProps);

type SideBarProps = ConnectedProps<typeof connector> & HistoryProps;

const SideBar = ({
    history,
    selected,
    setSideBarSelected }: SideBarProps) => {
    return (
        <div className='sidebar'>
            <div
                className='header'>
                <img alt='logo' className='logo' />
                <p className='title-admin'>Quản trị viên</p>
            </div>
            <img alt='avatar' className='avatar' />
            <p className='name'>Họ tên</p>
            <div style={selected === 0 ? { borderColor: '#e73e3e' } : {}} onClick={() => { history.push(`/home`); setSideBarSelected(0) }} className='sideOptions'>
                <AccountCircle style={Object.assign({}, {
                    width: '5vh',
                    height: '5vh'
                }, selected === 0 ? { color: '#e73e3e' } : {})} className='icon' />
                <p style={selected === 0 ? { color: '#e73e3e' } : {}} className='text'>Quản lý người dùng</p>
            </div>
            <div style={selected === 1 ? { borderColor: '#e73e3e' } : {}} onClick={() => { history.push(`/stations`); setSideBarSelected(1) }} className='sideOptions'>
                <LocalGasStationIcon style={Object.assign({}, {
                    width: '5vh',
                    height: '5vh'
                }, selected === 1 ? { color: '#e73e3e' } : {})} className='icon' />
                <p style={selected === 1 ? { color: '#e73e3e' } : {}} className='text'>Quản lý cây xăng</p>
            </div>
            <div style={selected === 2 ? { borderColor: '#e73e3e' } : {}} onClick={() => setSelected(2)} className='sideOptions'>
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