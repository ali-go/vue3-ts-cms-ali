// 请求类型
export interface IAccount {
  name: string;
  password: string;
}
// 1.登录请求响应中data的类型
export interface ILoginResult {
  id: number;
  name: string;
  token: string;
}
// 2.用户请求响应类型
export interface Role {
  id: number;
  name: string;
  intro: string;
  createAt: Date;
  updateAt: Date;
}

export interface Department {
  id: number;
  name: string;
  parentId?: any;
  createAt: Date;
  updateAt: Date;
  leader: string;
}

export interface IUserInfo {
  id: number;
  name: string;
  realname: string;
  cellphone: number;
  enable: number;
  createAt: Date;
  updateAt: Date;
  role: Role;
  department: Department;
}
