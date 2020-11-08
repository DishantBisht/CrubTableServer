const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Rows = require('../models/Rows');

const rowRouter = express.Router();

rowRouter.use(bodyParser.json());

rowRouter.route('/')
.get((req,res,next) => {
  Rows.find({})
  .then((Rows) => {
    res.StatusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(Rows);
  },(err) => next(err))
  .catch((err) => next(err) )
})
.post((req, res, next) => {
    Rows.create(req.body)
    .then((row) => {
        console.log('row Created ', row);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(row);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Rows');
})
.delete((req, res, next) => {
    Rows.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

rowRouter.route('/:rowId')
.get((req,res,next) => {
    Rows.findById(req.params.rowId)
    .then((row) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(row);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /Rows/'+ req.params.rowId);
})
.put((req, res, next) => {
    Rows.findByIdAndUpdate(req.params.rowId, { $set: req.body }, { new: true })
    .then((row) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(row);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Rows.findByIdAndRemove(req.params.rowId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = rowRouter;
