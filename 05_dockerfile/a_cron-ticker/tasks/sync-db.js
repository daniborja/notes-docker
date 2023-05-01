let times = 0;

const syncDb = () => {
  times++;
  console.log('running a task every 2 second - UPDATED', times);

  return times;
};

module.exports = { syncDb };
