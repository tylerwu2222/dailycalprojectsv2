import React from 'react';
// import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { StyledArticleCard, CardHeaderTypography, BylineTypography } from '../StyledComponents/StyledComponents';
import './ArticleCard.css'

const ArticleCard = ({
  title, date, image, url = "/", target="_blank"
}) => (
  <StyledArticleCard>
    <Link to={url} target ={target} style={{ textDecoration: 'none' }}>
      <div className='article-card-img-container'>
        {image ? <img className='article-card-img' src={image} loading='lazy'></img> : <></>}
      </div>
      <CardHeaderTypography>
        {title}
      </CardHeaderTypography>
      <BylineTypography gutterBottom>
        {date}
      </BylineTypography>
    </Link>
  </StyledArticleCard>
);
// export default withStyles(styles)(ArticleCard);
export default ArticleCard;
