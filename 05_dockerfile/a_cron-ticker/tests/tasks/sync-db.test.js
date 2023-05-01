const { syncDb } = require('../../tasks/sync-db');

describe('Test Sync-DB', () => {
  test('should exec the same process twice', () => {
    syncDb();
    const times = syncDb();

    expect(times).toBe(2);
  });
});
