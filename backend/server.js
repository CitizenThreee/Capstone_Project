const express = require("express");
const app = express();
require("dotenv").config();
const dbConnect = require("./dbConnect");
const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');
const userGroupRoutes = require('./routes/userGroupRoutes');
const tabRoutes = require('./routes/tabRoutes');
const contentRoutes = require('./routes/contentRoutes');

app.use(express.json());
app.use('/users', userRoutes);
app.use('/groups', groupRoutes);
app.use('/userGroups', userGroupRoutes);
app.use('/tabs', tabRoutes);
app.use('/content', contentRoutes);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});