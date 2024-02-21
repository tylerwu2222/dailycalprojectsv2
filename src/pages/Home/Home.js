import React from 'react'

// data
import posts from '../../page_data/articles/articlesData.json';

// components
// import SiteLogo from '../../components/SiteLogo/SiteLogo'
// import NavBar from '../../components/NavBar/NavBar'
import ArticleContainer from '../../components/ArticleContainer/ArticleContainer'

export default function Home() {
    return (
        <div>
            <ArticleContainer posts={posts} />
        </div>
    )
}
