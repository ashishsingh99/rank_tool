import React, { useState } from 'react';
import '../../css/login.css'
import logi from '../../Assets/login.jpg';
import logo from '../../Assets/seoimg/logo.png'
import google from '../../Assets/google.png'
import facebook from '../../Assets/facebook.png'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login_withAPi } from '../../../services/constants'
import axios from 'axios';
const Login = () => {


    const dispatch = useDispatch();
    const [mydata, setMydata] = useState('');
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const login = (e) => {

        e.preventDefault();
        dispatch({ type: 'LOADING' });
        let item = {
            email: Email,
            password: password
        };
        axios.post(login_withAPi(), item)
            .then(res => {
                // console.log(res.data)
                setMydata(res.data);
                localStorage.setItem('token', res.data.token.access);
                localStorage.setItem('status', res.data.status);
                localStorage.setItem('email', res.data.email);
                const status = localStorage.getItem('status')
                if (status === '200') {
                    const loginOut = true;
                    localStorage.setItem('loginOut', loginOut)
                    dispatch({ type: "USER" });
                    navigate('/')
                }
            })
            // .then(err => {
            //     // console.log(err);
            // })
        // dispatch({ type: 'NOTLOADING' });
    }



    return (
        <>
            <div className='lg-main-div'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6'>
                            <div className='lg-le-div'>
                                <div className='img-div-le'>
                                    <img className='lg_pg-logo' src={logo} alt='login img'>
                                    </img>

                                    <img className='lg_pg-image' src={logi} alt='login img'>
                                    </img>
                                </div>

                            </div>
                        </div>
                        <div className='col-6'>
                            <div className='lg-ri-div'>
                                <form>
                                    <div className='lg-ri-fm'>
                                        <h3 className='text-center'>LOGIN</h3>
                                        <div className='lg-sn-op'>
                                            <ul>
                                                <li> <img src={google} alt='google img'></img>continue with google</li>
                                                <li><img src={facebook} alt='facebook img'></img>continue with facebook</li>
                                            </ul>
                                        </div>
                                        <div className='lg-line'> </div>
                                        <input type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)} ></input>
                                        <label id='lb'>Email</label>


                                        <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} autoComplete='true'></input>
                                        <label id='lb'>Password</label>
                                        <p className='vl-msd-line'> {mydata.msg ? mydata.msg : <span><Link to='/forgot'>forgot password </Link></span>} </p>

                                        <div>
                                            <button type='submit' className='lg-button' onClick={login}>LOGIN</button>
                                            <h6 className='rs-now'> Don't have an account? <Link to='/register'> <b> Register Now </b> </Link></h6>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;