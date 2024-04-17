import React from 'react'
import members from '../../site_data/members/membersData.json';
import './Team.css';



const nameToImageSrc = (name) => {
  return name.replace(" ", "_").toLowerCase();
};

const MemberThumbnail = ({ memberInfo }) => {
  let image_src = 'images/members/' + nameToImageSrc(memberInfo.Name) + '.png';
  // set image source if name already taken
  if ('ImageSource' in memberInfo) {
    image_src = memberInfo.ImageSource + '.png';
  }

  return (
    <div className='member-card'>
      <p className='member-name'>{memberInfo.Name}</p>
      {'Position' in memberInfo ? <p className='member-position'>{memberInfo.Position}</p> : <></>}
      <img
        className='member-image'
        src={image_src}
        loading='lazy'
      ></img>
      <i className='member-bio'>
        {memberInfo.Bio}
      </i>
      {'FaveViz' in memberInfo ?
        <p><b style={{ fontWeight: 500 }}>Favorite chart type: </b>{memberInfo.FaveViz}</p>
        :
        <></>}
      {'Site' in memberInfo ?
        <p><b style={{ fontWeight: 500 }}>Website: </b><a target="_blank" href={memberInfo.SiteURL}>{memberInfo.Site}</a></p>
        :
        <></>}
    </div>
  );
};

export default function Team() {
  // console.log('members', members);
  // split current and former members
  const currentLeadership = members.filter(m => {
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
  console.log('curr leadership', currentLeadership);
  const currentMembers = members.filter(m => {
    if (!m.Former) {
      if (!m.Position.toLowerCase().includes('editor')) {
        return true;
      }
    }
    else {
      return false;
    }
  });
  const formerMembers = members.filter(m => m.Former);

  console.log('curr + former', currentMembers, formerMembers);
  return (
    <div className='members-container'>
      <h1>Project Team</h1>
      <div className='current-members-container'>
        <h2>Current Members</h2>
        <div className='current-member-cards-container'>
          {currentLeadership.map(m => <MemberThumbnail memberInfo={m} />)}
        </div>
        <div className='current-member-cards-container'>
          {currentMembers.map(m => <MemberThumbnail memberInfo={m} />)}
        </div>
        {/* <hr></hr> */}
      </div>
      <div className='former-members-container'>
        <h2>Former Members</h2>
        <div className='former-member-cards-container'>
          {formerMembers.map(m => <MemberThumbnail memberInfo={m} />)}
        </div>
      </div>
    </div>
  )
}
