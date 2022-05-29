import {makeAutoObservable} from "mobx";

export enum Roles {
  /*Ученик*/
  Student = 'student',
  /*Учитель на обучении*/
  TeacherEducation = 'teacherEducation',
  /*Учитель*/
  Teacher = 'teacher',
  /*Администратор франчайзи*/
  FranchiseeAdmin = 'franchiseeAdmin',
  /*Франчайзи*/
  Franchisee = 'franchisee',
  /*Методист*/
  Methodist = 'methodist',
  /*Куратор*/
  Tutor = 'Tutor',
  /*Центр*/
  Admin = 'admin',
  /*Неавторизованный*/
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
