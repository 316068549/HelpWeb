import { Role } from '../models/role';
  export class User {
  userId: number;
  userName: string;
  nickName: string;
  userPassword:number;
  createTime:number;
  userStatus:boolean;
  departmentId:number;
  roleList:Array<Role>;
}

