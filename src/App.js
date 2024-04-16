
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// data
import posts from '../src/site_data/articles/articlesData.json'

// components
import SiteLogo from './components/SiteLogo/SiteLogo';
import NavBar from './components/NavBar/NavBar';
import ArticleTemplate from './components/ArticleTemplate/ArticleTemplate';

import { urlify } from './scripts/textCleaning';

import './App.css';
import Home from './pages/Home/Home';

function App() {
  // const posts = ['p1','p2'];

  return (
    <Router>
      <div className="App">
        <SiteLogo />
        <NavBar />
      </div>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        {/* <Route exact path="/team" element={<Team />}></Route> */}
        {/* <Route exact path="/contact" element={<Contact />}></Route> */}
        {posts.map(post => {
          // console.log('all post', post);
          // if old link navigate to old site:
          if (!('oldLink' in post)) {
            if ('staging' in post) {
              console.log('staged post url:', "/staging/" + urlify(post.title)); // uncomment to check staging links
              return (
                <Route exact path={"/staging/" + urlify(post.title)} element={<ArticleTemplate
                  postData={post}
                />}></Route>
              )
            }
            // to use when need static url (different from title)
            if ('urlTitle' in post) {
              return (
                <Route exact path={"/article/" + urlify(post.urlTitle)} element={<ArticleTemplate
                  postData={post}
                />}></Route>
              )
            }
            return (
              <Route exact path={"/article/" + urlify(post.title)} element={<ArticleTemplate
                postData={post}
              />}>
              </Route>
            )
          }

        })
        }
      </Routes>
    </Router>
  );
}

export default App;
