import { RescueCountComponent } from './rescue-count.component';
import { RescueCountTableComponent } from './rescue-count-table/rescue-count-table.component';
import { RescueDetailComponent } from './rescue-detail/rescue-detail.component';

export const RescueCountRoutes = [{
	path: '',
	component: RescueCountComponent,
	children: [

    { path: '', component: RescueCountTableComponent },
    { path: 'detail/:rescueTeamId', component: RescueDetailComponent }

	]
}];

