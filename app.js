const express = require('express');
const cors = require('cors');
const { v4: uuid } = require('uuid');
const session = require("express-session");
const Keycloak = require("keycloak-connect");
const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore });
const app = express()

app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));
app.get('/health', function (req, res) {
  res.send('OK')
});
app.use(keycloak.middleware());

app.use((req, res, next) => {
  req.request_id = uuid();
  res.set('request_id', req.request_id);
  next();
});

app.use(cors());

app.get('/protected/resource', keycloak.protect(), (req, res) => {
  res.send("Yayy")
})

app.listen(5000)