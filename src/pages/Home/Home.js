import React, { createContext, useState } from 'react'
import { useParams } from "react-router-dom";
// data
import posts from '../../site_data/articles/articlesData.json';

// components
import NavBar from '../../components/NavBar/NavBar'
import ArticleContainer from '../../components/ArticleContainer/ArticleContainer'
import ArticleSearchContainer from '../../components/ArticleSearchContainer/ArticleSearchContainer';

export const HomeContext = createContext({});

export default function Home() {
    const { searchQuery } = useParams();

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
                {/* navbar content (team, about) */}
                <NavBar />
                {/* search box */}
                <ArticleSearchContainer posts={posts_reversed} initialSearchKeyword={searchQuery} />
                {/* article cards */}
                <ArticleContainer />
            </HomeContext.Provider>
        </div>
    )
}
