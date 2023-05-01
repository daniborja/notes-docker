const cron = require('node-cron');
const { syncDb } = require('./tasks/sync-db');

cron.schedule('1-59/2 * * * * *', syncDb);

console.log('Init');
