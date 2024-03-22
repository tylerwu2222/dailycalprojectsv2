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
    const posts_reversed = [...posts].reverse();
    const [dynamicPosts, setDynamicPosts] = useState(posts_reversed);

    return (
        <div>
            <HomeContext.Provider
                value={{
                    dynamicPosts,
                    setDynamicPosts
                }}
            >
                <ArticleSearchContainer posts={posts_reversed} />
                <ArticleContainer />
            </HomeContext.Provider>
        </div>
    )
}
