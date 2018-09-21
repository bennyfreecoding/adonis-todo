'use strict'
const Project = use('App/Models/Project')
const AuthorizationService = use('App/Service/AuthorizationService')
const ResourceNotExistException = use('App/Exceptions/ResourceNotExistException')

class ProjectController {
  async index({auth}){
    const user = await auth.getUser();

    return await user.projects();

  }

  async create({auth,request}){

      const user = await auth.getUser();

      const {title} = request.all();

      const project = new Project();

      project.fill({
        title ,
      });

      user.projects().save(project);
      return project;
  }

  async destroy({auth,params}){
    const user = await auth.getUser();
    const {id} = params;
    const project = await Project.find(id);

    if(!project){
      throw new ResourceNotExistException();
    }

    AuthorizationService.verifyPermission(project,user);

    await project.delete();

    return project;

  }

  async update({auth,params,request}){
    const user = await auth.getUser();
    const {id} = params;
    const project = await Project.find(id);

    if(!project){
      throw new ResourceNotExistException();
    }

    AuthorizationService.verifyPermission(project,user);

    project.merge(request.only('title'));
    await project.save();
    return project;

  }
}

module.exports = ProjectController
