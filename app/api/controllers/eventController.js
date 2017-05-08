const Projects = require('../data/projects')
const Events = require('../data/events')
const _ = require('lodash');
const Promise = require('bluebird')

exports.params = (req, res, next, id) => {
  let event = _.find(Events, {_id: Number(id)})

  if (!event) {
    next(new Error('No event with that id'));
  } else {
    req.event = event;
    next();
  }
};

exports.get = (req, res, next) => {
  let events = Events
  res.json(events)
}

exports.post = (req, res, next) => {
  var data = req.body;
  var newEvent = req.body.newEvent
  newEvent._id = Math.floor(Math.random() * 10000000)
  var project_name = req.body.project

  Events.push(newEvent)
  let project = _.find(Projects, {name: project_name})
  project.events.push(newEvent._id)
  res.json(data)
}

exports.put = function(req, res, next) {
  var event = req.event;
  var updateEventReq = req.body.event;
  
  _.merge(event, updateEventReq)
  if (err) {
    next(err);
  } else {
    res.json(saved);
  }
};

exports.delete = (req, res, next) => {
    _.pull(Events, req.event)
    res.json(Events)
};
