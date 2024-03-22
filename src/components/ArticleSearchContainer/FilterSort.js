
const filterPosts = (posts, filterKeyword, allColumns = false) => {
    // console.log('filtering posts', posts);
    const lowerKeyword = filterKeyword.toLowerCase()
    let postText;

    // wider search (all post attributes)
    if (allColumns == true) {
        let columns = Object.keys(posts[0])
        postText = posts.map(p => {
            let text = '';
            columns.map(c => {
                text += ' ' + p[c]
            })
            return text.toLowerCase()
        })
    }
    // narrower search
    else {
        postText = posts.map(p =>
            (p.title + ' ' +
                p.subhead + ' ' +
                p.featuredImage + ' ' +
                p.fileName + ' ' +
                p.date + ' ' +
                p.imageAttribution + ' ' +
                p.bylineName
            ).toLowerCase()
        );
    }

    // console.log('post text', postText);

    // check if keyword in any of posts' attribute text
    let filteredPosts = posts.filter((p, i) => {
        return postText[i].includes(lowerKeyword);
    })

    // // if tags exist: check if any tag in selected tags list
    // if (selectedTags.length > 0) {
    //     // console.log('selected tags', selectedTags);
    //     const postTags = posts.map(p => p.Tags);

    //     filteredPosts = filteredPosts.filter((p, i) => {
    //         return postTags[i].some(t => selectedTags.includes(t.trim())); // check
    //     })
    // }
    return filteredPosts;
}

export const filterSort = (
    content = [{}],
    filterParameter,
    // selectedTags = [],
    // sortParameter = null
) => {
    // reest content
    let FSContent = [...content];

    // filter array
    FSContent = filterPosts(content, filterParameter);
    // sort array
    // if (sortParameter) {
    //     FSContent = sortPosts(sortParameter, FSContent);
    // }
    console.log('FS',FSContent)

    return FSContent;
}