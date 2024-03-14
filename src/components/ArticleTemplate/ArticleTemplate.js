import React, { useState, useEffect } from 'react'
// import Markdown from 'react-markdown';
import Markdown from 'markdown-to-jsx';
import { MDXProvider } from '@mdx-js/react';
import { HeaderTypography, SubheaderTypography, BylineTypography } from '../StyledComponents/StyledComponents';
import ArticleFooter from '../ArticleFooter/ArticleFooter';

import './ArticleTemplate.css';

// import articles from '../../page_data/articles/articlesData.json';
// import reddit from '../../articles/2022-11-07-reddit.mdx';
// import PostsPerHourBarChart from '../../visuals/2022-11-07-reddit/PostsPerHourBarChart';
// import * as matter from 'gray-matter';

function formatDate(inputDate) {
    // Parse the input date string into a Date object
    const date = new Date(inputDate);
  
    // Format the date as "Month day, year"
    const formattedDate = date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  
    return formattedDate;
  }

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
    console.log('articleData', postData);



    // import article
    const importArticle = async () => {
        const { fileName, visuals } = postData;
        // 1) get article text from markdown
        try {
            const article_import = await import(`../../articles/${fileName}`);
            // get content from loaded module
            const static_article = article_import.default;
            // fetch article text from /static/media --> setMDX text
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
        } catch (error) {
            console.error(`Error importing module ${fileName}:`, error);
        }

        // 2) update visual components
        console.log('visual comps', visuals);
        const fileNameNoExt = fileName.split('.mdx')[0]
        let ArticleComponentObject = {};
        let ArticleComponentOverridesObject = {};
        // let PostsPerHourBarChart = await import(`../../visuals/${fileNameNoExt}/PostsPerHourBarChart.js`).default;
        for (const v of visuals) {
            try {
                const visual_import = await import(`../../visuals/${fileNameNoExt}/${v}`);
                const visual = visual_import.default;
                if (!(Array.isArray(visual)) && !(typeof visual === 'object') && (visual !== null)) {
                    // const static_article = visual_import.default;
                    const visFileName = v.split('.js')[0];
                    ArticleComponentObject[visFileName] = visual;
                    ArticleComponentOverridesObject[visFileName] = {
                        component: visual,
                      };
                    console.log('visual import', visual);
                }
            }
            catch (error) {
                console.error(`Error with visual ${v}:`, error);
            }
        };
        console.log('ACO', ArticleComponentObject);
        console.log('ACOO', ArticleComponentOverridesObject);
        setArticleComponents(ArticleComponentObject);
        setArticleComponentOverrides(ArticleComponentOverridesObject);
        // setArticleComponentOverrides({
        //     PostsPerHourBarChart: {
        //         component: PostsPerHourBarChart,
        //     }
        // });
    }

    // fetch text from mdx file
    useEffect(() => {
        importArticle();
    },[postData]);

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
                                    <a className='article-author' href={postData.bylineUrl[i]} target="_blank">
                                        <BylineTypography>{n}</BylineTypography>
                                    </a>
                                </span>)
                            }) :
                            <BylineTypography>author</BylineTypography>
                    }
                </div>
                <div className='article-caption-container'>
                    <BylineTypography>{formatDate(postData.date)}</BylineTypography>
                </div>
            </div>

            {/* image area */}
            <div className='outer-article-image-container'>
                <div className='article-image-container'>
                    <img src={postData.featuredImage} className='article-img' alt='feature-image'></img>
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
                    {/* {PostsPerHourBarChart ? <PostsPerHourBarChart /> : <></>} */}
                </MDXProvider>
            </div>
            {/* about area */}
            {/* <ArticleFooter about={frontmatter.aboutStory} /> */}
            <ArticleFooter />
        </div >
    )
}
