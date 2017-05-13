const Projects = require('../data/projects')
const Events = require('../data/events')
const _ = require('lodash')

const mapEventIdToEvent = id => _.cloneDeep(
  Events.filter(item => item._id === id)[0]
)

exports.params = (req, res, next, name) => {
  const project = _.cloneDeep(
    Projects.filter(item => item.name === name)[0]
  )

  project.events = project.events.map(mapEventIdToEvent)
  
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
