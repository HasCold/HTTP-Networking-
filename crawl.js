const {JSDOM} = require('jsdom');

function getURLsFromHTML(htmlBody, baseURL){
    const urls = [];
    // This Package JSDOM is allowing us to do that in node so we can write a command line script that interacts with the DOM and crawls web pages
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');
    for(const linkElement of linkElements){
        if(linkElement.href.slice(0, 1) === '/'){
            // relative url
            try {
                const urlobj = new URL(`${baseURL}${linkElement.href}`);
                urls.push(urlobj.href)
            } catch (error) {
                console.log(`error with relative urls: ${error.message}`);
            }
        }else{
            // absolute url
            try {
                const urlobj = new URL(`${linkElement.href}`);
                urls.push(urlobj.href)
            } catch (error) {
                console.log(`error with absolute urls: ${error.message}`);
            }
        }
    }
    return urls
}

function normalizeURL(urlString){
    // The URL() constructor returns a newly created URL object representing the URL defined by the parameters.
    const urlobj = new URL(urlString);
    const hostPath = `${urlobj.hostname}${urlobj.pathname}`;
    if(hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0, -1);  // slice from zero to negative one is everything except the last character 
    }
    // The first argument, 0, represents the starting index. In this case, it's 0, so the extraction will start from the beginning of the string.
    // The second argument, -1, represents the ending index. In this case, it's -1, which indicates that the extraction will stop just before the last character of the string.
    return hostPath;
}


module.exports = {normalizeURL, getURLsFromHTML}