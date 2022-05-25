import {makeAutoObservable} from "mobx";

export enum Roles {
  Pupil = 'pupil',
  Teacher = 'teacher',
  LearningTeacher = 'learningTeacher',
  Admin = 'admin',
  Franchisee = 'franchisee',
  Methodist = 'methodist',
  Curator = 'curator',
  Center = 'center',
  Unauthorized = 'unauthorized',
}

class AppStore {
  role: Roles = Roles.Unauthorized

  constructor() {
    makeAutoObservable(this)
  }
  setRole(role:Roles){
    this.role = role
  }
}

export default new AppStore()
