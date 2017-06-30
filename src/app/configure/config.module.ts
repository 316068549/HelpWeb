import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PaginationModule, ModalModule } from 'ng2-bootstrap';
import {DataTableModule} from "angular2-datatable";
import {CustomFormsModule} from "ng2-validation";
import { RouterModule } from '@angular/router';

import { SendService} from './config-table/service/send.service';
import { configRoutes } from './config.routes';
import { ConfigComponent } from './config.component';
import { ConfigTableComponent } from './config-table/config-table.component';
import { ConfigTimeComponent } from './config-time/config-time.component';



@NgModule({
  imports: [
    SharedModule,
    DataTableModule,
    CustomFormsModule,
    ModalModule.forRoot(),
    RouterModule.forChild(configRoutes)
  ],
  declarations: [
    ConfigTableComponent,
    ConfigComponent,
    ConfigTimeComponent
  ],
  providers: [ SendService ]
})
export class ConfigModule { }

