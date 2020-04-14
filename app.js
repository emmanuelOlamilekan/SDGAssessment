const express = require('express');
const covid19ImpactEstimator = require('./src/estimator');
const bodyparser = require('body-parser');
let app = express();
var EasyXml = require('easyxml');

const serializer = new EasyXml({
  singularize: true,
  rootElement: 'response',
  dateFormat: 'ISO',
  manifest: true
});


app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(bodyparser.json());

let port = process.env.PORT;

if (port == null || port == "") {
  port = 8000;
}

app.listen(port, () => {
  console.log('Server running on port 8000');
});

app.post('/api/v1/on-covid-19', (req, res, next) => {
  const data = covid19ImpactEstimator(req.body)
  res.json(data);
});

app.post('/api/v1/on-covid-19/json', (req, res, next) => {
  const data = covid19ImpactEstimator(req.body)
  res.json(data);
});

app.post('/api/v1/on-covid-19/xml', (req, res, next) => {
  const data = covid19ImpactEstimator(req.body)
  res.header('Content-Type', 'text/xml');
  const xml = serializer.render(data);
  res.se(xml);
});
