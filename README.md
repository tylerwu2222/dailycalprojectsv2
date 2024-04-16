

## [Live site](https://dailycalprojects.vercel.app/)

## Instructions for DC editors [below](#editor-notes)

## Installation
1) Clone the repository with `git clone https://github.com/tylerwu2222/dailycalprojectsv2.git`
2) Download node (which includes npm) if you don't have it https://nodejs.org/en/download (you can check if node is installed with `node -v`)
3) Run: `npm run install` in your terminal to install all dependencies

## Getting started

To run the app locally in development mode, navigate to the project directory, then run `npm start`

This will run the app at [http://localhost:3000](http://localhost:3000), which you can view in your browser.

The page will reload automatically when you make changes.

## Deploying
(NOTE: running `npm run build` isn't necessary with a Vercel app, since Vercel will automatically run the build command when deploying to the live site).

To push your changes to the live site, simply add, commit, and push your changes to the main branch.
You can view changes at the vercel [deployment dashboard](https://vercel.com/tyler-wus-projects/dailycalprojects).



# Editor notes
To check all available commands, run `npm run`

## Creating an article
### `npm run create-article` (WIP)
This script is still WIP, so for now, do some manual work to add a new article:
1) add mdx file to src/articles with the name: `yyyy-mm-dd-article-slug.mdx`
2) add frontmatter to the article, looks like this:
3) add text and visualizations below the frontmatter like so:
   
   1) Note that visualization files should use PascalCase notation otherwise `update-articles` will not load the visualization. For example, if a bar chart vis file is named: `DailyCalBarChart.js`, then the exported function should be `DailyCalBarChart`.


## Staging an article
When an article is in-progress, but we want to share with other Projects members or DC departments, we make a private staging link.
To stage an article, add `staging: true` in the front-matter of the mdx file like so:

Then run `npm update articles` (covered below).
### Unstaging
When an article is ready to deploy, simply remove `staging: true` from the front-matter and rerun `npm update articles`


## Updating articles
### `npm run update-articles`
This is a [script]() I wrote to automate the article updating process. It will do two things:
1) It will take the frontmatter info from all the mdx files and store it in the json file, [articlesData.json](https://github.com/tylerwu2222/dailycalprojectsv2/blob/main/src/page_data/articles/articlesData.json). This json file is in turn used to render articles on the home page (or add them to staging, covered later).
2) It will also add imports for the visualizations listed in src/visuals/[`yyyy-mm-dd-article-slug.mdx`]. The imports are needed so that components like <VisualExportName> will render in the mdx.


Using react-router-dom to navigate between pages.
- Article routes (urls) are defined dynamically in App.js
    - Route paths are currently: /article/urlified-title
- Links to article routes wrap the ArticleCard

### Archived functions:
To convert articles from Gatsby to react, run `npm run clean-gatsby`




This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).