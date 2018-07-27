const express = require('express');
const actionModel = require('./data/helpers/actionModel.js');
const mappers = require('./data/helpers/mappers.js');
const projectModel = require('./data/helpers/projectModel.js');

const server = express();
server.use(express.json());

server.get('/', (req, res) => res.send('API up and running!'));

server.get('/api/actions', (req, res) => {//get all actions

    actionModel.get()
      .then(actions => {
        res.status(200).json(actions);
      })
      .catch(error => {
        res.status(500)
          .json({ error: "The actions could not be retrieved." })
      })
  
  });
  server.get('/api/actions/:id', (req, res) => {//get actions by id
    const id = req.params.id;
    actionModel.get(id)//req.params.id
      .then(actions => {
        if (actions.length === 0) {
          res.status(404)
            .json({ error: "missing post." })
        }
        res.status(200).json(actions)
      }).catch(error => {
        res.status(500)
          .json({ error: "The actions with the specified postid do not exist." })
      });
  
  })

  server.post('/api/actions', (req, res) => {//add action 
    const action = req.body;
    actionModel.insert(action)
      .then(actions => {
        res.status(200).json(actions);
      })
      .catch(error => {
        res.status(500)
          .json({ error: "action not added." })
      })
  
  });
  server.put('/api/actions/:id', (req, res) => {//update action 
    const changes = req.body
    const id = req.params.id;
    actionModel.update(id, changes)
      .then(actions => {
        res.status(200).json(actions);
      })
      .catch(error => {
        res.status(500)
          .json({ error: "action not updated." })
      })
  
  });

  server.delete('/api/actions/:id', (req, res) => {//delete actions by id
    const { id } = req.params;
    // posts = posts.filter(p => p.id != id)
    actionModel.remove(id)
      .then(actions => {
        if (actions === 0) {
          res.status(404)
          .json({ error: "The action with the specified ID does not exist." })
        }
        res.status(200).json(actions)
      }).catch(error => {
        res.status(500)
          .json({ error: "error 2." })
      });
  })
  server.get('/api/projects', (req, res) => {//get all projects

    projectModel.get()
      .then(projects => {
        res.status(200).json(projects);
      })
      .catch(error => {
        res.status(500)
          .json({ error: "The projects could not be retrieved." })
      })
  
  });
  server.get('/api/projects/:id', (req, res) => {//get project by id
    const id = req.params.id;
    projectModel.get(id)//req.params.id
      .then(projects => {
        if (projects.length === 0) {
          res.status(404)
            .json({ error: "missing projects." })
        }
        res.status(200).json(projects)
      }).catch(error => {
        res.status(500)
          .json({ error: "The project with the specified id do not exist." })
      });
  
  });
  server.post('/api/projects', (req, res) => {//add project 
    const project = req.body
    projectModel.insert(project)
      .then(projects => {
        res.status(200).json(projects);
      })
      .catch(error => {
        res.status(500)
          .json({ error: "project not added." })
      })
  
  });
  server.put('/api/projects/:id', (req, res) => {//update project 
    const changes = req.body
    const { id } = req.params;
    projectModel.update(id, changes)
      .then(projects => {
        res.status(200).json(projects);
      })
      .catch(error => {
        res.status(500)
          .json({ error: "project not updated." })
      })
  
  });

  server.get('/api/pacts/:id', (req, res) => {//get project acts
    
    const  projectId  = req.params.id;
    projectModel.getProjectActions(projectId)
      .then(projects => {
        res.status(200).json(projects);
      })
      .catch(error => {
        res.status(500)
          .json({ error: "dunn whatsup." })
      })
  
  });

// using port 9000 for this example
server.listen(9000, () => console.log('API running on port 9000'));