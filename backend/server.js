const express = require('express');
const mongoose = require ('mongoose');
 const cors = require('cors');
 require ('dotenv').config();

 const app = express();

 const PORT = process.env.PORT || 5000;

 app.use(cors());
 app.use(express.json());

 mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('mongodb connected '))
    .catch(()=> console.error('mongodb connection error:', error));


app.use('/api/items', require('./routes/items')) ;

app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`));