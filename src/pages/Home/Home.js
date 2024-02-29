import React, { createContext, useState } from 'react'

// data
import posts from '../../page_data/articles/articlesData.json';

// components
// import SiteLogo from '../../components/SiteLogo/SiteLogo'
// import NavBar from '../../components/NavBar/NavBar'
import ArticleContainer from '../../components/ArticleContainer/ArticleContainer'
import ArticleSearchContainer from '../../components/ArticleSearchContainer/ArticleSearchContainer';

export const HomeContext = createContext({});

export default function Home() {

    const [dynamicPosts, setDynamicPosts] = useState(posts);

    return (
        <div>
            <HomeContext.Provider>
                <ArticleSearchContainer />
                <ArticleContainer posts={posts} />
            </HomeContext.Provider>
        </div>
    )
}
