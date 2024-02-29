import React, {useState, useContext} from 'react'

export default function ArticleFilter() {
  const sortOptions = [
    'date - latest to oldest',
    'date - oldest to latest'
  ];

  const [sortOption, setSortOption] = useState(sortOptions[0]);

  const sortArticles = () => { 
    // sort articles by date
    if (sortOption == sortOptions[0]){

    }
    else if (sortOption == sortOptions[1]){

    }
  }



  // mui dropdown with options
  return (
    <div>ArticleFilter</div>
  )
}
