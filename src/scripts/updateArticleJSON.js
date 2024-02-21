const chokidar = require('chokidar');
const fs = require('fs-extra');
const path = require('path');
const grayMatter = require('gray-matter');


// path to article content
const articlesDirectory = path.resolve(__dirname, '../articles');
// get all articles from article folder
var articles = fs.readdirSync(articlesDirectory);
// path to hold articles data
const jsonFilePath = path.resolve(__dirname, '../page_data/articles/articlesData.json');

function updateJsonFile() {
  console.log('articles', articles);
  try {
    // map data from articles to json
    const jsonData = articles.map((file) => {
      console.log('file',file);
      const mdxContent = fs.readFileSync(path.join(__dirname,'../articles/',file), 'utf8');
      const { data, content } = grayMatter(mdxContent);
      // console.log('graymatter', data, content);
      return ({
        id: 0,
        fileName: file,
        filePath: path.join('../../articles', file),
        ...data
      });
    }
    );
    fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2));
    // await fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2));
    console.log('JSON file updated successfully.');
  } catch (error) {
    console.error('Error updating JSON file:', error);
  }
}

updateJsonFile();