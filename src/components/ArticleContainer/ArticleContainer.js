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
                return (
                    <ArticleCard
                        title={post.title}
                        date={post.date}
                        image={post.featuredImage}
                        url={"/article/" + urlify(post.title)}
                    >
                    </ArticleCard>
                )
            }
            )}
        </div >

    )
}
