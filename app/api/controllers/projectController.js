const Projects = require('../data/projects')
const Events = require('../data/events')
const _ = require('lodash')
const Promise = require('bluebird')

exports.params = (req, res, next, name) => {
  let project = _.find(Projects, {name: name})

  _.forEach(project.events, (event_id) => {
    if (typeof event_id === 'number') {
      let event = _.find(Events, {_id: event_id})
      let index = _.indexOf(project.events, event_id)
      project.events[index] = event
    }
  });
  
  if (!project) {
    next(new Error('Can not find project with given id'));
  } else {
    req.project = project
    next()
  }
};

exports.get = (req, res, next) => {
  let projects = Projects
  res.json(projects)
};

exports.post = (req, res, next) => {
  var newProject = req.body;
  newProject.events = []
  newProject._id = Math.floor(Math.random() * 10000000)
  Projects.push(newProject)
  res.json(Projects)
}

exports.getOne = function(req, res, next) {
  let project = req.project   
  res.json(project)  
};
