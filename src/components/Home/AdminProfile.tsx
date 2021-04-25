import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';
import loading from '../../assets/loadings/medium.loading.gif';
import paths from "../../configs/paths.config";

import { updateProfile, updateAccountAvatar } from '../../reducers/account.reducer';
import HistoryProps from "../../types/HistoryProps.type";
import isEmail from 'validator/lib/isEmail';
import "../../styles/components/Home/AdminProfile.scss";
import { RootState } from '../../reducers/root.reducer';
import PageWrapper from "../common/PageWrapper";
import { NavBarLink } from "../common/NavBar";
import RouterProps from "../../types/RouterProps.type";

const mapStateToProps = (state: RootState) => ({
    me: state.accountReducer.me,
    accessToken: state.authenticationReducer.accessToken,
});

const mapDispatchToProps = {
    updateProfile,
    updateAccountAvatar
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ProfileProps = ConnectedProps<typeof connector> & RouterProps & HistoryProps;


const UserProfile = (props: ProfileProps) => {
    const [tab, setTab] = useState(0);

    // const [email, changeEmail] = useState('');
    const [name, changeName] = useState('');
    const [password, changePassword] = useState('');
    const [currentPassword, changeCurrentPassword] = useState('');
    const [confirmPassword, changeConfirmPassword] = useState('');
    const [avatar, changeAvatar] = useState('');

    const [isUpdating, setIsUpdating] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    const [error, setError] = useState('');

    const validateData = () => {
        // if (email !== '') {
        //     if (email.trim().length > 100) {
        //         return 'Email must not contain more than 100 characters!';
        //     }

        //     if (!isEmail(email.trim())) {
        //         return 'Email is not valid!';
        //     }
        // }

        if (name !== '') {
            if (name.trim().length > 64) {
                return 'Name must not contain more than 64 characters!';
            }
        }

        if (currentPassword !== '') {
            if (password.trim().length < 8) {
                return 'Current password must contain at least 8 characters!';
            }
        }

        if (password !== '') {
            if (password.trim().length < 8) {
                return 'Password must contain at least 8 characters!';
            }
        }

        if (confirmPassword !== '') {
            if (password.trim().length < 8) {
                return 'Confirm password must contain at least 8 characters!';
            }
        }

        if (password !== '' && confirmPassword === '') {
            return 'Confirm password is required!'
        }

        if (password === '' && confirmPassword !== '') {
            return 'Password is required!'
        }

        if (password !== '' && confirmPassword !== '') {
            if (confirmPassword !== password) {
                return 'Confirm password must be the same as password!';
            }
        }

        if (password !== '' && confirmPassword !== '' && currentPassword === '') {
            return 'Current password is required!'
        }


        return '';
    };

    const onHandleUpdate = async () => {
        setIsUpdating(true);

        const validateResult = validateData();
        setError(validateResult);

        if (validateResult) {
            return setIsUpdating(false);
        }

        props.updateProfile({
            // email,
            name
        })
    }

    const onHandleChangePassword = async () => {
        const validateResult = validateData();
        setError(validateResult);
        if (validateResult) {
            return setIsUpdating(false);
        }

        props.updateProfile({
            currentPassword,
            password
        })
    }

    const onHandleChangeAvatar = async (e: any) => {
        try {
            setIsUploadingImage(true);
            const data = new FormData();
            data.append('avatar', e.target.files[0]);

            props.updateAccountAvatar(data);
        }
        catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        setIsUploadingImage(false);
    }, [avatar]);

    useEffect(() => {
        if (props.me) {
            changeName(props.me.name);
            changeAvatar(props.me.avatar);
            // changeEmail(props.me.email);
        }
    }, [props.me]);

    const links: Array<NavBarLink> = [{
        name: 'Home',
        url: paths.base,
    }, {
        name: 'Profile',
        url: paths.profile,
    }];

    if (!props.me) {
        return (
            <div style={{ width: '150px', margin: 'auto' }}>
                <img src={loading} alt="Loading... " />
            </div>
        )
    };

    return (
        <PageWrapper links={links} history={props.history}>
            <div className="Thông tin người dùng">
                <Grid container className="Profile__wrapper" justify="center">
                    <Grid item xs={12} lg={2} >
                        <div className="Profile__paper-sidebar">
                            <div className="Profile__avatar no-select"
                                onClick={() => {
                                    if (!isUploadingImage) {
                                        document.getElementById("uploadAvatar").click();
                                    }
                                }}
                            >
                                {
                                    !isUploadingImage && avatar &&
                                    <img src={avatar} alt="" />
                                }
                                {
                                    !isUploadingImage &&
                                    <input
                                        accept=".jpg,.png,.jpeg"
                                        multiple={false}
                                        type="file"
                                        id="uploadAvatar"
                                        onChange={(e) => onHandleChangeAvatar(e)}
                                        disabled={isUploadingImage}
                                    />
                                }
                                {
                                    isUploadingImage &&
                                    <div>
                                        <img className="AddEditCourse__cover-wrapper__loading" src={loading} height={100} width={100} alt="Uploading..." />
                                    </div>
                                }
                            </div>

                            <Typography className="title Avatar__title">
                                {props.me.name}
                            </Typography>

                            <div className={tab === 0 ? "Sidebar__option-title-clicked" : "Sidebar__option-title"}>
                                <Button className="Option-button"
                                    onClick={() => setTab(0)}
                                >Thông tin người dùng</Button>
                            </div>

                            <div
                                className={tab === 1 ? "Sidebar__option-title-clicked" : "Sidebar__option-title"}
                            >
                                <Button className="Option-button"
                                    onClick={() => setTab(1)}
                                >Đổi mật khẩu</Button>
                            </div>
                        </div>

                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <div className="Profile__paper-content">
                            <Typography variant="h4" className="title Profile__title">
                                Thông tin người dùng
                            </Typography>

                            {error ?
                                <Typography className="error" variant="body1">{error}</Typography> :
                                <div hidden={!isUpdating}>
                                    <Typography className="error" variant="body1">Cập nhật thành công!</Typography>
                                </div>
                            }

                            {tab === 0 &&
                                <div>
                                    {/* <TextField
                                        className="Profile__text-field"
                                        label="Email"
                                        variant="outlined"
                                        type="Email"
                                        value={email}
                                        onChange={(e) => changeEmail(e.target.value)}
                                        required /> */}
                                    <TextField
                                        className="Profile__text-field"
                                        label="Họ tên"
                                        variant="outlined"
                                        value={name}
                                        onChange={(e) => changeName(e.target.value)}
                                        required />
                                    <div className="Profile__content-button">
                                        <Button
                                            className="Profile__cancel-button-custom"
                                            variant="contained"
                                            onClick={() => props.history.push(paths.base)}
                                        >Cancel
                                        </Button>
                                        <Button
                                            className="Profile__update-button-custom"
                                            variant="contained"
                                            onClick={onHandleUpdate}
                                        >
                                            Cập nhật
                                        </Button>
                                    </div>

                                </div>}
                            {tab === 1 &&
                                <div>
                                    <TextField
                                        className="Profile__text-field"
                                        label="Mật khẩu hiện tại"
                                        variant="outlined"
                                        type="Password"
                                        onChange={(e) => changeCurrentPassword(e.target.value)}
                                        required />

                                    <TextField
                                        className="Profile__text-field"
                                        label="Mật khẩu mới"
                                        variant="outlined"
                                        type="Password"
                                        onChange={(e) => changePassword(e.target.value)}
                                        required />

                                    <TextField
                                        className="Profile__text-field"
                                        label="Xác nhận mật khẩu mới"
                                        variant="outlined"
                                        onChange={(e) => changeConfirmPassword(e.target.value)}
                                        type="Password"
                                        required />
                                    <div className="Profile__content-button">
                                        <Button
                                            className="Profile__cancel-button-custom"
                                            variant="contained"
                                            onClick={() => props.history.push(paths.base)}
                                        >Cancel
                                        </Button>
                                        <Button
                                            className="Profile__update-button-custom"
                                            variant="contained"
                                            onClick={onHandleChangePassword}
                                        >
                                            Cập Nhật
                                        </Button>
                                    </div>
                                </div>
                            }
                        </div>
                    </Grid>
                </Grid>
            </div >
        </PageWrapper >
    )
}

export default connector(UserProfile);