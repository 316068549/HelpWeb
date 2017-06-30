import { RoleComponent } from './role.component';
import { RoleTableComponent } from './role-table/role-table.component';

export const roleRoutes = [{
	path: '',
	component: RoleComponent,
	children: [

    { path: '', component: RoleTableComponent },
    // { path: 'detail/:id', component: MenuDetailComponent }

	]
}];

