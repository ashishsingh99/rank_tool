import React from 'react'
import '../css/topbar.css'
import userImg from "../../Mycomponent/Assets/seoimg/userImg.jpg";
import { Logout } from '../../Mycomponent/share/upDater/constant';
const TopBar = () => {
    return (
        <div className='Top-bar'>
            <div className='cmd'>

                <div id='adminSearch' className='admin_search me-5'><i className='fa-solid fa-search'> </i><input type='search' id='adsearch' placeholder='search something here . . .' /></div>

                <div>

                    <div className='admin_NameBar'>

                        <div className='userLogo'><img src={userImg}></img></div>
                        <div>
                            <h6>Alekh Verma</h6>
                            <p>info@esearchlogix.com</p>
                        </div>
                        <div><i className="fa-solid fa-caret-down"></i></div>
                        <div className='adminName_drop'>
                            <ul>
                                <li>Edit</li>
                                <li onClick={Logout}>Sign out</li>
                            </ul>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default TopBar