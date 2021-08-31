const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Players = require('./models/blog');


const app = express();


const dbURI = "mongodb+srv://markdb:lionelmessi_10@cluster0.lqrg2.mongodb.net/Mark-Database?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));


app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});


app.get('/', (req, res) => {
  res.redirect('/Players');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About us' });
});


app.get('/Players/create', (req, res) => {
  res.render('create', { title: 'Add a new Player' });
});

app.get('/Players', (req, res) => {
  Players.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { blogs: result, title: 'All Football Players' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/Players', (req, res) => {
  
  const Player = new Players(req.body);

  Player.save()
    .then(result => {
      res.redirect('/Players');
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/Players/:id', (req, res) => {
  const id = req.params.id;
  Players.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Player Details' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete('/Players/:id', (req, res) => {
  const id = req.params.id;
  
  Players.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/Players' });
    })
    .catch(err => {
      console.log(err);
    });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});