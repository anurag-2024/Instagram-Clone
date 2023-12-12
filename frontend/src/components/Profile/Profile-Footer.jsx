import React from 'react'
const Profile_Footer = () => {
    const year = new Date().getFullYear();
    return (
        <>
            <div className='profile-down-footer'>
                <div className='profile-down-footer-content'>
                    <a href='https://about.meta.com/' target='_blank'>Meta</a>
                    <a href='https://about.instagram.com/' target='_blank'>About </a>
                    <a href='https://about.instagram.com/en_US/blog' target='_blank'>Blog </a>
                    <a href='https://about.instagram.com/about-us/careers' target='_blank'>Jobs </a>
                    <a href='https://help.instagram.com/' target='_blank'>Help </a>
                    <a href='https://developers.facebook.com/docs/instagram' target='_blank'>API </a>
                    <a href='https://privacycenter.instagram.com/policy/?entry_point=ig_help_center_data_policy_redirect' target='_blank'>Privacy </a>
                    <a href='https://help.instagram.com/581066165581870/' target='_blank'>Terms </a>
                    <a href='https://www.instagram.com/explore/locations/' target='_blank'>Locations </a>
                    <a href='https://www.instagram.com/web/lite/' target='_blank'>Instagram Lite </a>
                    <a href='https://www.threads.net/login'>Threads </a>
                    <a href='https://www.facebook.com/help/instagram/261704639352628'>Contact Uploading & Non-Users </a>
                    <a href='https://about.meta.com/technologies/meta-verified/' target='_blank'>Meta Verified </a>
                </div>
                <div className='profile-down-footer-p'>
                    <p>© {year} INSTAGRAM FROM META</p>
                </div>
            </div>
        </>
    )
}

export default Profile_Footer
