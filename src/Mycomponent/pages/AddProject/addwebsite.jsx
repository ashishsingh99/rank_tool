import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RippleButton from "../../share/components/rippleButton";

export const AddWebsite = () => {
    const navigate = useNavigate();

    const [websiteURL, setWebsiteUrl] = useState('');
    const [websiteName, setWebsiteName] = useState('');
    const [valida, setValida] = useState('');






    const Addwebsite = (e) => {
        e.preventDefault();

        // alert('type access')
        if (websiteURL.length === 0) {
            setValida('please provide all the details');
        }
        else if (websiteName.length === 0) {
            setValida('please provide all the details');
        }
        else {
            localStorage.setItem('websitename', websiteName);
            localStorage.setItem('newprojecturl', websiteURL)
            // console.log('websiteURL', websiteURL)
            // console.log('websiteName', websiteName)
            navigate('addcountry')
        }
    }



    return <>
        <div className='cmd-b'>
            <div className=' add-pr-url'>
                <form >
                    <div>

                        <h1>Add Website</h1>
                        <p>
                            Start tracking and improving your website’s SEO traffic.
                        </p>
                        <div>
                            <input type='text' autoComplete='true' placeholder='website url' onChange={(e) => setWebsiteUrl(e.target.value)}></input>
                        </div>
                        <div>
                            <input type='text' autoComplete='true' placeholder='website Name' onChange={(e) => setWebsiteName(e.target.value)}></input>
                            {valida ? <p className="vl-msd-line mt-0 text-right">{valida}</p> : false}
                        </div>
                        <div className='add-pr-btn'>
                        <Link to={-1}>  <button className='cm-btn-b'  >Back</button> </Link>
                            <RippleButton className='cm-btn' type='submit' onClick={Addwebsite}>Next</RippleButton>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </>
}