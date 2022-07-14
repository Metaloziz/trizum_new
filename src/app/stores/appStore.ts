import { TimeZoneType } from 'app/types/AuthTypes';
import { ResponseLoadMe } from './../types/AuthTypes';
import  authService  from 'app/services/authService';
import { makeAutoObservable, runInAction } from 'mobx';

export enum Roles {
  /* Ученик */
  Student = 'student',
  /* Родитель */
  Parent = 'parent',
  /* Учитель на обучении */
  TeacherEducation = 'teacherEducation',
  /* Учитель */
  Teacher = 'teacher',
  /* Администратор франчайзи */
  FranchiseeAdmin = 'franchiseeAdmin',
  /* Франчайзи */
  Franchisee = 'franchisee',
  /* Методист */
  Methodist = 'methodist',
  /* Куратор */
  Tutor = 'tutor',
  /* Центр */
  Admin = 'admin',
  /* Неавторизованный */
  Unauthorized = 'unauthorized',
}

export const RoleNames = {
  student: 'Ученик',
  parent: 'Родитель',
  teacherEducation: 'Учитель на обучении',
  teacher: 'Учитель',
  franchiseeAdmin: 'Администратор франчайзи',
  franchisee: 'Франчайзи',
  methodist: 'Методист',
  tutor: 'Куратор',
  admin: 'Центр',
};

class EmptyUser {
  id;
  firstName;
  middleName:null|string;
  lastName;
  email;
  phone;
  role;
  franchise:null|string;
  city:null|string;
  birthdate:TimeZoneType;
  sex:null|string;
  status;
  avatar:{id:string,path:string};
  constructor(){
    this.id = '';
    this.firstName='';
    this.middleName= '' ;
    this.lastName= '';
    this.email= '';
    this.phone= '';
    this.role= '';
    this.franchise= '';
    this.city= '';
    this.birthdate= {
      date: '',
  timezone_type : 0,
  timezone: ''
    };
    this.sex= '';
    this.status= '';
    this.avatar= {
      id: '',
      path: '',
    };
  }
}
class AppStore {
  role: Roles = Roles.Unauthorized;

  token = '';

  user = new EmptyUser();

  constructor() {
    makeAutoObservable(this);
  }

  setRole = (role: Roles): void => {
    this.role = role;
  };

  setToken = (token: string) => {
    this.token = token;
  };
  setUser = async () => {
    const res:ResponseLoadMe = await authService.loadme()
    runInAction(()=>{
      this.role = res.role as Roles
      this.user = res
    })
  }
}

export default new AppStore();
