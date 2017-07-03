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
			{ path: '', redirectTo: 'helpers', pathMatch: 'full' },
      // {
      //   path: 'menu',
      //   loadChildren: '../menu/menu.module#MenuModule'
      // },
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
        path: 'helpers',
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
      // {
      //   path: 'role',
      //   loadChildren: '../role/role.module#RoleModule'
      // },
      // {
      //   path: 'data',
      //   loadChildren: '../data/data.module#DataModule'
      // },
      // {
      //   path: 'permission',
      //   loadChildren: '../permission/permission.module#PermissionModule'
      // },
      {
        path: 'monitor',
        component: MonitorComponent
      },
      // {
      //   path: 'help',
      //   component: HelpComponent
      // }

		]
	}
];
