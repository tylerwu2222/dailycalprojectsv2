export const urlify = (title) => {
    return title == undefined ? '' : title.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
};