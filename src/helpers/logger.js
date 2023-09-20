import conf from '../../config/config.js';

function log(msg, color, force) {
  if (!force && !conf.logging) return;
  if (color) {
    console.log(`\x1b${color}${msg}\x1b[0m`);
    return;
  }
  console.log(msg);
}

export default log;
