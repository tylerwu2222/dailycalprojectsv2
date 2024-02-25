import React, { useState, useEffect, lazy, Suspense } from 'react'
// import Markdown from 'react-markdown';
import Markdown from 'markdown-to-jsx';
import { MDXProvider } from '@mdx-js/react';
import { HeaderTypography, SubheaderTypography, BylineTypography } from '../StyledComponents/StyledComponents';

import './ArticleTemplate.css';

// import articles from '../../page_data/articles/articlesData.json';
// import reddit from '../../articles/2022-11-07-reddit.mdx';
import PostsPerHourBarChart from '../../visuals/2022-11-07-reddit/PostsPerHourBarChart';
// import * as matter from 'gray-matter';


export default function ArticleTemplate({
    postData
}) {
    // raw article MDX
    const [articleMDX, setArticleMDX] = useState('');
    // components to import
    const [articleComponents, setArticleComponents] = useState({});
    // markdown-to-jsx component override options
    const [articleComponentOverrides, setArticleComponentOverrides] = useState({});

    console.log('navigated to article:', postData.title);
    // console.log('articleData', postData);

    // import article
    const importArticle = async () => {
        const { fileName, visuals } = postData;
        // first get article text from markdown
        try {
            // 0) Use dynamic import() to import the module
            const article_import = await import(`../../articles/${fileName}`);
            // get content from loaded module
            const static_article = article_import.default;

            // 1) fetch article text from /static/media --> setMDX text
            fetch(static_article)
                .then(res => res.text())
                .then(text => {
                    // clean text
                    // console.log('article text', text);
                    const content = text.split('---')[2];
                    // console.log('article gray', content);
                    // set text for article
                    setArticleMDX(content);
                });

            // 2) update visual components
            console.log('visual comps', visuals);
            for (const v of visuals) {
                const visual_import = await import(`../../visuals/${v}`);
                console.log(visual_import)
            };
            setArticleComponents({ PostsPerHourBarChart: PostsPerHourBarChart })
            setArticleComponentOverrides({
                PostsPerHourBarChart: {
                    component: PostsPerHourBarChart,
                }
            });

        } catch (error) {
            console.error(`Error importing module ${fileName}:`, error);
        }
        // then import visualizations needed for article
        const visuals_folder = fileName.split('.mdx')[0];
    }

    // fetch text from mdx file
    useEffect(() => {
        importArticle();

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
                <MDXProvider
                    components={articleComponents}>
                    <Markdown
                        children={articleMDX}
                        options={{
                            overrides: articleComponentOverrides,
                        }}
                    />
                </MDXProvider>
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
