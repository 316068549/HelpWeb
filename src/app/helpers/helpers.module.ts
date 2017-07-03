import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PaginationModule, ModalModule } from 'ng2-bootstrap';
import {DataTableModule} from "angular2-datatable";
import {CustomFormsModule} from "ng2-validation";
import { RouterModule } from '@angular/router';

import { HelperService } from '../helpers/helpers-service';
import { helperRoutes } from './helpers.routes';
import { HelperComponent } from './helpers.component';
import { HelpersTableComponent } from './helpers-table/helpers-table.component';



@NgModule({
  imports: [
    SharedModule,
    DataTableModule,
    CustomFormsModule,
    ModalModule.forRoot(),
    RouterModule.forChild(helperRoutes)
  ],
  declarations: [
    HelpersTableComponent,
    HelperComponent
  ],
  providers: [ HelperService ]
})
export class HelpersModule { }

