const fs = require('fs-extra');
const path = require('path');
// const grayMatter = require('gray-matter');


// path to article content
const articlesDirectory = path.resolve(__dirname, '../articles');


function cleanGatsbyArticles() {
    // get all articles from article folder
    let articles = fs.readdirSync(articlesDirectory);
    articles.slice(30, 31).map((file, index) => {
        console.log(file, index);
        const mdxContent = fs.readFileSync(path.join(__dirname, '../articles/', file), 'utf8');
        console.log(mdxContent);
    });
};


cleanGatsbyArticles();