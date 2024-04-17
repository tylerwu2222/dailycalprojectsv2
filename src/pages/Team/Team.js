import React from 'react'

import NavBar from '../../components/NavBar/NavBar';

import staffersData from '../../site_data/staffers/staffersData.json';
import articles from '../../site_data/articles/articlesData.json';

import { HeaderTypography, SubheaderTypography } from '../../components/StyledComponents/StyledComponents';
import './Team.css';
import { Link } from 'react-router-dom';


const nameToImageSrc = (name) => {
  return name.replace(" ", "_").toLowerCase();
};

// link to staffers
const Publications = ({ name }) => {
  // get link to all publications with byline
  const authoredArticles = articles.filter(article => {
    if (article.staging){
      return false;
    }
    if ('bylineName' in article) {
      return article.bylineName.includes(name);
    }
    else if ('byline' in article) {
      return article.byline.includes(name);
    }
  })
  const publicationCount = authoredArticles.length;
  // console.log(name, authoredArticles);
  return <Link to={"/home/" + name}><p>Publications ({publicationCount})</p></Link>
}

const backupImageUrl = 'images/staffers/default.png';
// 
const StafferCard = ({ stafferInfo }) => {
  let image_src = 'images/staffers/' + nameToImageSrc(stafferInfo.FullName) + '.png';
  // set image source if name already taken
  if ('ImageSource' in stafferInfo) {
    image_src = stafferInfo.ImageSource + '.png';
  }

  return (
    <div className='staffer-card'>
      <p className='staffer-name'>{stafferInfo.FullName}</p>
      <p className='staffer-position'>{stafferInfo.Position}</p>
      <img
        className='staffer-image'
        src={image_src}
        onError={(e) => {
          e.target.src = backupImageUrl;
        }}
        loading='lazy'
      ></img>
      <i className='staffer-bio'>
        {stafferInfo.Bio}
      </i>
      <Publications name={stafferInfo.FullName} />
      {'FaveViz' in stafferInfo ?
        <p><b style={{ fontWeight: 500 }}>Favorite chart type: </b>{stafferInfo.FaveViz}</p>
        :
        <></>}
      {'Site' in stafferInfo ?
        <p><b style={{ fontWeight: 500 }}>Website: </b><a target="_blank" href={stafferInfo.SiteURL}>{stafferInfo.Site}</a></p>
        :
        <></>}
    </div>
  );
};

export default function Team() {
  // clean staffer data
  let staffers = staffersData.map(staff => {
    // add FullName
    staff.FullName = staff.FirstName + " " + staff.LastName
    // add position if missing
    if (!'Position' in staff) {
      staff.Position = 'Projects Developer';
    }
    else {
      if (staff.Position === '') {
        staff.Position = 'Projects Developer';
      }
    }
    return staff;
  }
  );
  // sort alphabetically
  staffers.sort((a, b) => {
    const nameA = a.LastName.toLowerCase(); // Convert names to lowercase for case-insensitive sorting
    const nameB = b.LastName.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0; // If names are equal
  });

  // split current and former staffers
  const currentLeadership = staffers.filter(m => {
    if (!m.Former) {
      if (m.Position.toLowerCase().includes('editor')) {
        console.log('position', m.Position, m.Position.length)
        return true;
      }
    }
    else {
      return false;
    }
  }
  )
  // console.log('curr leadership', currentLeadership);
  const currentStaffers = staffers.filter(m => {
    if (!m.Former) {
      if (!m.Position.toLowerCase().includes('editor')) {
        return true;
      }
    }
    else {
      return false;
    }
  });
  const formerStaffers = staffers.filter(m => m.Former);
  // console.log('curr + former', currentStaffers, formerStaffers);

  return (
    <><NavBar />
      <div className='staffers-container'>

        <HeaderTypography>Project Team</HeaderTypography>
        <div className='current-staffers-container'>
        <SubheaderTypography>Current Editors</SubheaderTypography>
          <div className='current-staffer-cards-container'>
            {currentLeadership.map(m => <StafferCard stafferInfo={m} />)}
          </div>
          <SubheaderTypography>Current Staff</SubheaderTypography>
          <div className='current-staffer-cards-container'>
            {currentStaffers.map(m => <StafferCard stafferInfo={m} />)}
          </div>
          {/* <hr></hr> */}
        </div>
        <div className='former-staffers-container'>
          <SubheaderTypography>Former Staffers</SubheaderTypography>
          <div className='former-staffer-cards-container'>
            {formerStaffers.map(m => <StafferCard stafferInfo={m} />)}
          </div>
        </div>
      </div>
    </>
  )
}
