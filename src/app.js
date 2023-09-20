import axios from 'axios';
import sleep from './helpers/sleep.js';
import imgParser from './helpers/img-parser.js';
import log from './helpers/logger.js';
import conf from '../config/config.js';
import sitemap from '../config/sitemap.json' assert { type: 'json' };
import crypto from 'crypto';
import jsonToCsv from './helpers/json-to-csv.js';
import fs from 'fs';
import { GREEN, BLUE, YELLOW } from './helpers/ansi-colors.js';

class Application {
  saveResults(results) {
    const uuid = crypto.randomUUID().slice(0, 4);
    const csv = jsonToCsv(results);
    log(`Saving Results to ${uuid}.csv`);
    fs.writeFileSync(`results/${uuid}.csv`, csv);
  }

  async getImgDetails(url, pages) {
    const { headers } = await axios(url, { method: 'head' });
    if (!headers || !headers['content-type'] || !headers['content-length']) return null;
    return {
      url,
      size_kb: (parseInt(headers['content-length']) * 0.001).toFixed(2),
      type: headers['content-type'],
      pages
    };
  }

  async main() {
    log('Web Image Analyzer', YELLOW, true);
    log('Summary:', GREEN, true);
    log(`Logging: ${conf.logging}`, null, true);
    log(`Timeout: ${conf.timeout}`, null, true);
    log(`Sitemap Items: ${sitemap.length}`, null, true);

    const srcMap = new Map();

    log('Fetching Image URLs', GREEN, true);
    for (let url of sitemap) {
      log(url, BLUE);
      const res = await axios(url);
      const images = imgParser(res.data);
      for (let img of images) {
        if (srcMap.has(img)) {
          srcMap.set(img, `${srcMap.get(img)}, ${url}`);
          continue;
        }
        srcMap.set(img, url);
      }
      await sleep(conf.timeout);
    }

    log(`Fetching Image Details (Image URLs: ${srcMap.size})`, GREEN, true);
    const results = [];
    for (let [url, pages] of srcMap) {
      log(url, BLUE);
      const details = await this.getImgDetails(url, pages);
      if (details) results.push(details);
      await sleep(conf.timeout);
    }

    log('Saving Results', GREEN, true);
    this.saveResults(results);
    process.exit(0);
  }
}

export default Application;
