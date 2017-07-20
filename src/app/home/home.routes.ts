import { HomeComponent } from './home.component';
import { MonitorComponent } from '../monitor/monitor.component';
import { VideoComponent } from '../monitor/video/video.component';
import { ElectricityComponent } from '../electricity/electricity.component';
import { StatusComponent } from '../status/status.component';
import { HelpComponent } from '../help/help.component';

export const workspaceRoutes = [
	{
		path: '',
		component: HomeComponent,
		children: [
			{ path: '', redirectTo: 'device', pathMatch: 'full' },
      {
        path: 'menu/:permissionId',
        loadChildren: '../menu/menu.module#MenuModule'
      },
      // {
      //   path: 'electricity',
      //   loadChildren: '../electricity/electricity.module#ElectricityModule'
      // },
      // {
      //   path: 'track',
      //   loadChildren: '../track/track.module#TrackModule'
      // },
      // {
      //   path: 'status',
      //   loadChildren: '../status/status.module#StatusModule'
      // },
      // {
      //   path: 'warn',
      //   loadChildren: '../warn/warn.module#WarnModule'
      // },
      // {
      //   path: 'config',
      //   loadChildren: '../configure/config.module#ConfigModule'
      // },
      {
        path: 'helpers/:permissionId',
        loadChildren: '../helpers/helpers.module#HelpersModule'
      },
      {
        path: 'device',
        loadChildren: '../device/device.module#DeviceModule'
      },
      {
        path: 'rescuecount',
        loadChildren: '../rescue-count/rescue-count.module#RescueCountModule'
      },
      {
        path: 'users/:permissionId',
        loadChildren: '../users/users.module#UsersModule'
      },
      {
        path: 'permission/:permissionId',
        loadChildren: '../permissions/permissions.module#PermissionModule'
      },
      // {
      //   path: 'role',
      //   loadChildren: '../role/role.module#RoleModule'
      // },
      // {
      //   path: 'data',
      //   loadChildren: '../data/data.module#DataModule'
      // },

      {
        path: 'monitor',
        component: MonitorComponent
      },
      {
        path: 'video',
        component: VideoComponent
      },
      // {
      //   path: 'help',
      //   component: HelpComponent
      // }

		]
	}
];
