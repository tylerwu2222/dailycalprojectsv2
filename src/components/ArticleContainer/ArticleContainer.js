import React, { useState, useEffect, useContext } from 'react'
// router
import { Routes, Route, Link } from "react-router-dom";

import ArticleCard from '../ArticleCard/ArticleCard';
import { urlify } from '../../scripts/textCleaning';

// styles
import './ArticleContainer.css';
import { HomeContext } from '../../pages/Home/Home';

export default function ArticleContainer() {
    const { dynamicPosts, setDynamicPosts } = useContext(HomeContext);
    return (
        <div className='articles-container'>
            {dynamicPosts.map(post => {
                // {posts.map(post => {
                let url;
                let target;
                if ('oldLink' in post) {
                    url = post['oldLink'];
                    target = '_blank';
                }
                else if ('urlTitle' in post) {
                    url = '/article/' + urlify(post.urlTitle);
                    target = '_self';
                }
                else {
                    url = '/article/' + urlify(post.title);
                    target = '_self';
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
            <p style={{ display: dynamicPosts.length === 0 ? 'block' : 'none' }}>No posts matched these filters 😔</p>
        </div >

    )
}
