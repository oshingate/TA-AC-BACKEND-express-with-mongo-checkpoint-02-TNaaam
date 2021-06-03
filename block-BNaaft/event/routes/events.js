var express = require('express');
var Event = require('../models/event');
var Remark = require('../models/remark');
var router = express.Router();

/* GET event listing. */
router.get('/', function (req, res, next) {
  Event.find({}, (err, events) => {
    if (err) return next(err);

    res.render('eventList', { events });
  });
});

//creating new event

router.get('/new', (req, res, next) => {
  res.render('eventCreateForm');
});

router.post('/new', (req, res, next) => {
  let data = req.body;
  let arr = data.category.split(',').map((ele) => {
    return ele.trim();
  });
  data.event_category = arr;
  Event.create(data, (err, event) => {
    if (err) return next(err);
    res.redirect('/events');
  });
});

//details event

router.get('/:id', (req, res, next) => {
  let eventId = req.params.id;
  Event.findById(eventId, (err, event) => {
    if (err) return next(err);
    res.render('eventDetails', { event });
    // res.json(event);
  });
});

//edit event
router.get('/:id/edit', (req, res, next) => {
  let eventId = req.params.id;

  Event.findById(eventId, (err, event) => {
    if (err) return next(err);

    res.render('eventEditForm', { event });
  });
});

router.post('/:id/edit', (req, res, next) => {
  let eventId = req.params.id;
  let data = req.body;
  let arr = data.category.split(',').map((ele) => {
    return ele.trim();
  });
  data.event_category = arr;

  Event.findByIdAndUpdate(eventId, data, (err, event) => {
    if (err) return next(err);

    res.redirect('/events/');
  });
});

//delete event

router.get('/:id/delete', (req, res, next) => {
  let eventId = req.params.id;

  Event.findByIdAndDelete(eventId, (err, deleted) => {
    if (err) return next(err);

    res.redirect('/events');
  });
});

//event like handler

router.get('/:id/like/inc', (req, res, next) => {
  let eventId = req.params.id;

  Event.findByIdAndUpdate(eventId, { $inc: { likes: 1 } }, (err, event) => {
    if (err) return next(err);
    res.redirect('/events/' + eventId);
  });
});

router.get('/:id/like/dec', (req, res, next) => {
  let eventId = req.params.id;

  Event.findByIdAndUpdate(eventId, { $inc: { likes: -1 } }, (err, event) => {
    if (err) return next(err);
    res.redirect('/events/' + eventId);
  });
});

module.exports = router;
