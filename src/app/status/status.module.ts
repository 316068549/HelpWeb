import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PaginationModule, ModalModule } from 'ng2-bootstrap';
import {DataTableModule} from "angular2-datatable";
import {CustomFormsModule} from "ng2-validation";
import { RouterModule } from '@angular/router';

import { statusRoutes } from './status.routes'
import { StatusComponent } from  './status.component'
import { StatusService } from './status-service';
import { StatusTableComponent } from './status-table/status-table.component';



@NgModule({
  imports: [
    SharedModule,
    DataTableModule,
    CustomFormsModule,
    ModalModule.forRoot(),
    RouterModule.forChild(statusRoutes)
  ],
  declarations: [
    StatusComponent,
    StatusTableComponent
  ],
  providers: [ StatusService ]
})
export class StatusModule { }
