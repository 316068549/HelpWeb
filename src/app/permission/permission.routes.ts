import { PermissionComponent } from './permission.component';
import { PermissionTableComponent } from './permission-table/permission-table.component';

export const permissionRoutes = [{
	path: '',
	component: PermissionComponent,
	children: [

    { path: '', component: PermissionTableComponent },
    // { path: 'detail/:id', component: MenuDetailComponent }

	]
}];

