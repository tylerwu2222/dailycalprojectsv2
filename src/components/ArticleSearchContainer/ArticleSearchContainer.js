import React, { useState, useEffect, useContext } from 'react';
import ArticleSearch from './ArticleSearch';
// import ArticleFilter from './ArticleFilter';

import { filterSort } from './FilterSort';

import './ArticleSearchContainer.css';
import { HomeContext } from '../../pages/Home/Home';

export default function ArticleSearchContainer({ posts }) {
    const [searchKeyword, setSearchKeyword] = useState('');

    const { dynamicPosts, setDynamicPosts } = useContext(HomeContext);

    useEffect(() => {
        setDynamicPosts(filterSort(posts, searchKeyword));
        // setFSPosts(filterSort(postData, searchKeyword, selectedTags, sortOption));
        // }, [posts, searchKeyword]);
    }, [searchKeyword]);

    return (
        <div className='article-search-container'>
            <ArticleSearch onChangeFn={setSearchKeyword} />
            {/* <ArticleFilter /> */}
        </div>
    )
}
