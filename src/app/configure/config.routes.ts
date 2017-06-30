import { ConfigComponent } from './config.component';
import { ConfigTableComponent } from './config-table/config-table.component';
import { ConfigTimeComponent } from './config-time/config-time.component';

export const configRoutes = [{
	path: '',
	component: ConfigComponent,
	children: [

    { path: '', component: ConfigTableComponent },
    { path: 'timeconfig', component: ConfigTimeComponent }

	]
}];

