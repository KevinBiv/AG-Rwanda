const express = require('express');
const app = express();
const path = require('path');
const PORT = 4400;

app.use(express.json());

// app.use('/', express.static(path.join(__dirname, '/public')));  // serve static files

// app.use('/posts.html', express.static(path.join(__dirname, '/public')));  // serve static files

app.use(express.static('public'));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

// routes
app.use('/', require('./routes/root'));     // root
app.use('/posts.html', require('./routes/posts'))   // when user clicks on the posts menu
app.use('/farmer/posts', require('./routes/api/FarmerPosts'));      // /farmer/posts
