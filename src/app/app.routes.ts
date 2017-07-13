import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';

export const appRoutes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: LoginComponent
	},

  // {
  //   path: 'home',
  //   component: HomeComponent  TestComponent
  // },
	{
		path: 'home',
		loadChildren: './home/home.module#WorkspaceModule'
	}
	// ,
	// {
	// 	path: '**', // fallback router must in the last
	// 	component: LoginComponent
	// }
];
