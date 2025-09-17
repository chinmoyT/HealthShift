const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log('mongodb connected'))
    .catch(err=> console.log('Mongdb connection error:', err));
