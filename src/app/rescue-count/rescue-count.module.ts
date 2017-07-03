import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PaginationModule, ModalModule } from 'ng2-bootstrap';
import {DataTableModule} from "angular2-datatable";
import {CustomFormsModule} from "ng2-validation";
import { RouterModule } from '@angular/router';

import { RescueCountService } from '../rescue-count/rescue-count-service';
import { RescueCountRoutes } from './rescue-count.routes';
import { RescueCountComponent } from './rescue-count.component';
import { RescueCountTableComponent } from './rescue-count-table/rescue-count-table.component';
import { RescueDetailComponent } from './rescue-detail/rescue-detail.component';



@NgModule({
  imports: [
    SharedModule,
    DataTableModule,
    CustomFormsModule,
    ModalModule.forRoot(),
    RouterModule.forChild(RescueCountRoutes)
  ],
  declarations: [
    RescueCountComponent,
    RescueCountTableComponent,
    RescueDetailComponent
  ],
  providers: [ RescueCountService ]
})
export class RescueCountModule { }

