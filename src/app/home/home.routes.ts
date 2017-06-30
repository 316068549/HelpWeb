import { HomeComponent } from './home.component';
import { MonitorComponent } from '../monitor/monitor.component';
import { ElectricityComponent } from '../electricity/electricity.component';
import { StatusComponent } from '../status/status.component';
import { HelpComponent } from '../help/help.component';

export const workspaceRoutes = [
	{
		path: '',
		component: HomeComponent,
		children: [
			{ path: '', redirectTo: 'electricity', pathMatch: 'full' },
      {
        path: 'menu',
        loadChildren: '../menu/menu.module#MenuModule'
      },
      {
        path: 'electricity',
        loadChildren: '../electricity/electricity.module#ElectricityModule'
      },
      {
        path: 'track',
        loadChildren: '../track/track.module#TrackModule'
      },
      {
        path: 'status',
        loadChildren: '../status/status.module#StatusModule'
      },
      {
        path: 'warn',
        loadChildren: '../warn/warn.module#WarnModule'
      },
      {
        path: 'config',
        loadChildren: '../configure/config.module#ConfigModule'
      },
      {
        path: 'users',
        loadChildren: '../users/users.module#UsersModule'
      },
      {
        path: 'role',
        loadChildren: '../role/role.module#RoleModule'
      },
      {
        path: 'data',
        loadChildren: '../data/data.module#DataModule'
      },
      {
        path: 'permission',
        loadChildren: '../permission/permission.module#PermissionModule'
      },
      {
        path: 'monitor',
        component: MonitorComponent
      },
      {
        path: 'help',
        component: HelpComponent
      }

      // { path: 'menu', component: MenuComponent }
			// { path: 'menu', loadChildren: '../menu/post.module#PostModule' },
			// { path: 'comment', loadChildren: '../comment/comment.module#CommentModule' },
			// { path: 'org', loadChildren: '../org/org.module#OrgModule' },
			// { path: 'user', loadChildren: '../user/user.module#UserModule' },
			// { path: 'role', loadChildren: '../role/role.module#RoleModule' },
			// { path: 'permission', loadChildren: '../permission/permission.module#PermissionModule' },
			// { path: 'sys', loadChildren: '../sys/sys.module#SysModule' },
			// { path: 'map', loadChildren: '../map/map.module#MapModule' }
		]
	}
];
