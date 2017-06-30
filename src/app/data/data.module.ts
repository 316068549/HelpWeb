import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PaginationModule, ModalModule } from 'ng2-bootstrap';
import {DataTableModule} from "angular2-datatable";
import {CustomFormsModule} from "ng2-validation";
import { RouterModule } from '@angular/router';

import { DataService } from './data-service';
import { dataRoutes } from './data.routes';
import { DataComponent } from './data.component';
import { DatasTableComponent } from './data-table/data-table.component';



@NgModule({
  imports: [
    SharedModule,
    DataTableModule,
    CustomFormsModule,
    ModalModule.forRoot(),
    RouterModule.forChild(dataRoutes)
  ],
  declarations: [
    DatasTableComponent,
    DataComponent
  ],
  providers: [ DataService ]
})
export class DataModule { }

