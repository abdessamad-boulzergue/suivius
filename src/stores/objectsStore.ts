import { makeAutoObservable } from "mobx"
import { Project } from "../database/dao/ProjectDao";

class ProjectObjectStore {

    projectsInCategorie :{[key:string]:Array<Project>} = {};

    constructor() {
        makeAutoObservable(this)
    }

    setProjects(categorie:string,projects:Array<Project>) {
        this.projectsInCategorie[categorie] = projects;
    }
    getCategorie(categorie:string){
        return this.projectsInCategorie[categorie] || [];
    }
    updateProject(project:Project) {
        const projects = this.projectsInCategorie[project.id_categorie.toString()]
        const index = projects.findIndex(proj => proj.id === project.id);
        if(index > -1){
            // to make sure mobx picks up the change.
            this.projectsInCategorie[project.id_categorie.toString()] = [
                ...projects.slice(0, index),
                project,
                ...projects.slice(index + 1),
            ];
        }
    }
}

export const projectObjectStore = new ProjectObjectStore();