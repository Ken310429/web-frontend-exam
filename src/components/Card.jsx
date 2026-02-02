import React from 'react';
import { MdOutlinePerson } from "react-icons/md";
import { IoBookOutline, IoLogoBitcoin } from "react-icons/io5";
import '../styles/Card.scss';


const Card = ({ job, educationMap, salaryMap, onViewDetail }) => {

    return (
        <div className='job-card'>
            <p className='company-name'>{job.companyName}</p>
            <p className='job-title'><MdOutlinePerson />{job.jobTitle}</p>
            <p className='education-level'><IoBookOutline />{educationMap[job.educationId]}</p>
            <p className='salary-level'><IoLogoBitcoin />{salaryMap[job.salaryId]}</p>
            <p className='job-info'>{job.preview}</p>
            <button className='apply-button' onClick={() => onViewDetail(job.id)}>查看細節</button>
        </div>
    );
}

export default Card;
