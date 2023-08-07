const {test, expect} = require('@jest/globals');
const { normalizeURL, getURLsFromHTML } = require('./crawl');

// https://boot.dev
// http://boot.dev     All the three urls are going to normalize and give it to the boot.dev
// https://Boot.dev

test('normalizeURL strip protocol', () => {
    const input = 'https://blog.boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);  //  expect(received).toEqual(expected)
})
test('normalizeURL trailing slash', () => {
    const input = 'https://blog.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);  //  expect(received).toEqual(expected)
})
test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);  //  expect(received).toEqual(expected)
})
test('normalizeURL strip http', () => {
    const input = 'http://blog.boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);  //  expect(received).toEqual(expected)
})

//  URLs From HTML :- 
test('getURLsFromHTML absolute', () => {
    const inputFromHTML = `
    <html>
    <body>
        <a href="https://blog.boot.dev/path/">
            Boot.dev Blog
        </a>
    </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev/path"
    const actual = getURLsFromHTML(inputFromHTML, inputBaseURL);
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);  //  expect(received).toEqual(expected)
})
test('getURLsFromHTML relative', () => {  // relative url is the url that doesn't include protocol and the domain but only path
    const inputFromHTML = `
    <html>
    <body>
        <a href="/path/">
            Boot.dev Blog
        </a>
    </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputFromHTML, inputBaseURL);
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);  //  expect(received).toEqual(expected)
})
test('getURLsFromHTML both', () => {  // relative url is the url that doesn't include protocol and the domain but only path
    const inputFromHTML = `
    <html>
    <body>
        <a href="https://blog.boot.dev/path1/">
            Boot.dev Blog Path One
        </a>
        <a href="/path2/">
            Boot.dev Blog Path Two
        </a>
    </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputFromHTML, inputBaseURL);
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"];
    expect(actual).toEqual(expected);  //  expect(received).toEqual(expected)
})
test('getURLsFromHTML invalid', () => {  // relative url is the url that doesn't include protocol and the domain but only path
    const inputFromHTML = `
    <html>
    <body>
        <a href="invalid">
            Invalid URL
        </a>
    </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputFromHTML, inputBaseURL);
    const expected = [];
    expect(actual).toEqual(expected);  //  expect(received).toEqual(expected)
})
