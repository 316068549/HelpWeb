import { DataComponent } from './data.component';
import { DatasTableComponent } from './data-table/data-table.component';

export const dataRoutes = [{
	path: '',
	component: DataComponent,
	children: [

    { path: '', component: DatasTableComponent },
    // { path: 'detail/:id', component: MenuDetailComponent }

	]
}];

