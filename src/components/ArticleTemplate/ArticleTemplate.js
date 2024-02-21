import React, { useState, useEffect, lazy, Suspense } from 'react'
import Markdown from 'react-markdown';

import { HeaderTypography, SubheaderTypography, BylineTypography } from '../StyledComponents/StyledComponents';

import './ArticleTemplate.css';

import reddit from '../../articles/2022-11-07-reddit.mdx'

export default function ArticleTemplate({
    postData
}) {

    const [articleText, setArticleText] = useState('');

    console.log('navigated to article:', postData.title);
    console.log(postData);


    // fetch text from mdx file
    useEffect(() => {
        // const mdxFile = "# Test markdown content";
        // const mdxFilePath = ;
        const mdxFilePath = lazy(() => import(postData.filePath));
        // <Suspense></Suspense>

        // fetch(mdxFilePath).then(
        //     res => {
        //         console.log('mdx res',res)
        //         return res.text()}
        //     ).then(text => setArticleText(text))
        fetch(reddit).then(res => res.text()).then(text => setArticleText(text))
    }, [postData]);

    return (
        <div className='article-container'>
            {/* title + byline area */}
            <div className='article-header-section'>
                <div className='article-title-container'>
                    <HeaderTypography>{postData.title}</HeaderTypography>
                </div>
                <div className='article-caption-container'>
                    <SubheaderTypography>{postData.subhead}</SubheaderTypography>
                </div>
                <div className='article-authors-container'>
                    {
                        Array.isArray(postData.bylineName) ?
                            postData.bylineName.map((n, i) => {
                                return (<span>
                                    <a href={postData.bylineUrl[i]} target="_blank">
                                        <BylineTypography>{n}</BylineTypography>
                                    </a>
                                </span>)
                            }) :
                            <BylineTypography>author</BylineTypography>
                    }
                </div>
                <div className='article-caption-container'>
                    <BylineTypography>{postData.date}</BylineTypography>
                </div>
            </div>

            {/* image area */}
            <div className='outer-article-image-container'>
                <div className='article-image-container'>
                    <img src={postData.featuredImage} className='article-img'></img>
                    <div className='article-image-attribution-container'>
                        <BylineTypography>{postData.imageAttribution}</BylineTypography>
                    </div>
                </div>
            </div>

            {/* content area */}
            <div className="article-content">
                {/* <Markdown children={mdxFile} /> */}
                <Markdown children={articleText} />
            </div>
            {/* about area */}
            <div className="article-content"></div>
            {/* support area */}
            <div className="article-content"></div>
            {/* copyright area */}
            <div className="article-content"></div>
        </div >
    )
}
