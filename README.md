# Web Image Analyzer

This npm script crawls through a JSON sitemap of URLs (`config/sitemap.json`), retrieves all images from the HTML image elements and requests each URL to get its file size and content type. It generates a CSV with *image urls*, *file size*, *file type* and *reference pages*.

## Installation

`npm install`

## Usage

1. Adjust `config/config.js` with your configuration preferences:

`logging` - this will enable/disable logging
`timeout` - the time between network requests (in milliseconds)

2. Add your URLs to sitemap.json. Each item in the JSON array should be a url string

3. Run the program with:

`npm run start`

## Results

The results will be saved in `results/<unique-filename>.csv`. The program will output the unique file name when the execution finishes.

## Node Version

This software was tested on Node.js `v18.17.1` and NPM `v10.0.0`
