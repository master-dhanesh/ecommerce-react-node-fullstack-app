import React, { Fragment, useState } from 'react';
import './ResetPassword.css';
import Loader from '../layout/Loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, resetPassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MetaData from '../layout/Metadata';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';

const ResetPassword = () => {
 
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const params = useParams();


    const { error, success, loading } = useSelector(state => state.forgotPassword);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const resetPasswordSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(params.token,myForm));
    }

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Password Updated Successfully");

            navigate('/login');

        }
    }, [dispatch, error, alert, navigate, success])


    return <Fragment>
        {loading ? <Loader /> : <Fragment>
            <MetaData title="Change Password" />
            <div className="resetPasswordContainer">
                <div className="resetPasswordBox">

                    <h2 className='resetPasswordHeading'>Update Password</h2>

                    <form
                        className="resetPasswordForm"
                        onSubmit={resetPasswordSubmit}>

                        <div>
                            <LockOpenIcon />
                            <input
                                type="password"
                                placeholder='New Password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <LockIcon />
                            <input
                                type="password"
                                placeholder='Confirm Password'
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>


                        <input
                            type="submit"
                            value="Reset"
                            className='resetPasswordBtn'
                            disabled={loading ? true : false}
                        />
                    </form>

                </div>
            </div>
        </Fragment>}
    </Fragment>;
};

export default ResetPassword;
