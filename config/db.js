const mongoose = require('mongoose');

const dbURI = process.env.DB_URI || 'mongodb://localhost:27017/mydatabase';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
  console.log('Database connection successful');
}).catch(err => {
  console.error('Database connection error:', err);
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

module.exports = mongoose;