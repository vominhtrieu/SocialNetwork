const IdRecord = require('./models/IdRecord');

module.exports = () => {
  IdRecord.find({}, (err, records) => {
    if (err) console.log(err);
    else if (!records || records.length === 0) {
      const startingNumber = 1000000000;

      const startingRecords = [
        {
          model: 'User',
          recentId: startingNumber,
        },
        {
          model: 'Image',
          recentId: startingNumber,
        },
        {
          model: 'ChatRoom',
          recentId: startingNumber,
        },
        {
          model: 'Post',
          recentId: startingNumber,
        },
      ];

      for (record of startingRecords) {
        const idRecord = new IdRecord(record);
        idRecord.save();
      }
    }
  });
};
