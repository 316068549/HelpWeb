export class Menu {
  permissionId: number;
  permissionName: string;
  permissionResource: string;
  permissionDescription: string;
  permissionParentId:number;
  createTime: number;
  permissionTypeId: number;
  permissionUrl:string;
  status:boolean;
  subAdminPermission:Array<Menu>;
}
