import React from 'react';
import style from "./../assets/css/AdminFooter.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const AdminFooter = () => {
    return (
        <div>
            <div className={style.footer1}>
                <div className={style.footer4}>Made With <FontAwesomeIcon className={style.footer5} icon={faHeart} /> By TEAM THIRTY FIRST</div>
            </div>
        </div>
    );
};

export default AdminFooter;