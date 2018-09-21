'use strict'
const Task = use('App/Models/Task')
const Project = use('App/Models/Project')
const AuthorizationService = use('App/Service/AuthorizationService')
const ResourceNotExistException = use('App/Exceptions/ResourceNotExistException')


class TaskController {

  async index({auth,params}){
    const user = await auth.getUser();

    const {id} = params

    const project = await Project.find(id);

    if(!project){
      throw new ResourceNotExistException();
    }

    AuthorizationService.verifyPermission(project,user);

    return await project.tasks().fetch();
  }

  async create({auth,request,params}){

    const user = await auth.getUser();

    const {id} = params

    const project = await Project.find(id);

    if(!project){
      throw new ResourceNotExistException();
    }

    AuthorizationService.verifyPermission(project,user);

    const {task_decription,completed} = request.all();

    const task = new Task();

    task.fill({
      task_decription ,
      completed,
    });

    project.tasks().save(task);
    return task;
  }

  async destroy({auth,params}){
    const user = await auth.getUser();
    const {id} = params;

    const task = await Task.find(id);

    if(!task){
      throw new ResourceNotExistException();
    }

    const project = await task.project().fetch();

    if(!project){
      throw new ResourceNotExistException();
    }

    AuthorizationService.verifyPermission(project,user);

    await task.delete();

    return task;

  }

  async update({auth,params,request}){
    const user = await auth.getUser();
    const {id} = params;

    const task = await Task.find(id);

    if(!task){
      throw new ResourceNotExistException();
    }

    const project = await task.project().fetch();

    if(!project){
      throw new ResourceNotExistException();
    }

    AuthorizationService.verifyPermission(project,user);

    task.merge(request.only(['task_decription','completed']));

    await task.save();
    return task;

  }
}

module.exports = TaskController
