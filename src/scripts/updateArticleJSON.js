// const chokidar = require('chokidar');
const fs = require('fs-extra');
const path = require('path');
const grayMatter = require('gray-matter');


// path to article content
const articlesDirectory = path.resolve(__dirname, '../articles');
const visualsDirectory = path.resolve(__dirname,'../visuals');
// get all articles from article folder
const articles = fs.readdirSync(articlesDirectory);
const visualFolders = fs.readdirSync(visualsDirectory);
// path to hold articles data
const jsonFilePath = path.resolve(__dirname, '../page_data/articles/articlesData.json');

function updateJsonFiles() {

  // map data + visualization imports from articles to json: articlesData.json
  try {
    const jsonData = articles.map((file, index) => {
      console.log('file',file);
      let visuals = '';
      const mdxContent = fs.readFileSync(path.join(__dirname,'../articles/',file), 'utf8');
      const { data, content } = grayMatter(mdxContent);
      const visualsSubfolderName = file.split('.mdx')[0];
      if (visualFolders.includes(visualsSubfolderName)){
        // console.log(visualsSubfolderName, 'found');
        const visualsSubdirectory = path.resolve(__dirname,'../visuals/',visualsSubfolderName);
        visuals = fs.readdirSync(visualsSubdirectory);
      }
      
      // console.log('file',file,visuals);
      // console.log('graymatter', data, content);
      return ({
        id: index,
        fileName: file,
        filePath: path.join('../../articles', file),
        visuals: visuals,
        ...data
      });
    }
    );
    fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2));
    // await fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2));
    console.log('JSON file updated successfully. Find files at src/page_data/articles/articlesData.json');
  } catch (error) {
    console.error('Error updating JSON file:', error);
  }

}

updateJsonFiles();