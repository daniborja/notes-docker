let times = 0;

const syncDb = () => {
  times++;
  console.log('running a task every 2 second - Multi-Stage Build', times);

  return times;
};

module.exports = { syncDb };
