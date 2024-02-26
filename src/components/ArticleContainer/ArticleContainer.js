import React, { useState } from 'react'
// router
import { Routes, Route, Link } from "react-router-dom";

import ArticleCard from '../ArticleCard/ArticleCard';
import { urlify } from '../../scripts/textCleaning';

// styles
import './ArticleContainer.css';

export default function ArticleContainer({ posts }) {
    // const [selectedArticle, setSelectedArticle] = useState(null);

    return (
        <div className='articles-container'>
            {posts.map(post => {
                let url;
                let target;
                if ('oldLink' in post) {
                    url = post['oldLink']
                    target = '_blank'
                }
                else {
                    url = '/article/' + urlify(post.title);
                    target = '_self'
                }
                return (
                    <ArticleCard
                        title={post.title}
                        date={post.date}
                        image={post.featuredImage}
                        url={url}
                        target={target}
                    >
                    </ArticleCard>
                )
            }
            )}
        </div >

    )
}
