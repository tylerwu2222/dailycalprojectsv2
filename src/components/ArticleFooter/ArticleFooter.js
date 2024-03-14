import React from 'react';
import { StyledFooterCard } from '../StyledComponents/StyledComponents';
import './ArticleFooter.css'

const ArticleFooter = ({ about = '' }) => (
  <div className='footer-container'>
    <br />
    <StyledFooterCard>
      <h3>
        <b> About this story </b>
      </h3>
      <p> This project was developed by the Projects Department at The Daily Californian. </p>
      <p>
        {about}
      </p>
      <p>
        Questions, comments or corrections? Email
        {' '}
        <a href="mailto: projects@dailycal.org.">projects@dailycal.org</a>
        .
      </p>
      <p>
        Code, data and text are open-source on
        {' '}
        <a href="https://github.com/dailycal-projects/dailycalprojects">GitHub</a>
        .
      </p>
    </StyledFooterCard>

    <StyledFooterCard>
      <h3>
        <b>
          Support us
        </b>
      </h3>
      <p>
        We are a nonprofit, student-run newsroom. Please consider
        {' '}
        <a href="https://donate.dailycal.org">donating</a>
        {' '}
        to support our coverage.
      </p>
    </StyledFooterCard>
    <p style={{ paddingLeft: '5px' }}> Copyright © 2022 The Daily Californian, The Independent Berkeley Student Publishing Co., Inc. </p>

  </div>
);

export default ArticleFooter;
