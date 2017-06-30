import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PaginationModule, ModalModule } from 'ng2-bootstrap';
import {DataTableModule} from "angular2-datatable";
import {CustomFormsModule} from "ng2-validation";
import { RouterModule } from '@angular/router';

import { PermissionService } from './permission-service';
import { permissionRoutes } from './permission.routes';
import { PermissionComponent } from './permission.component';
import { PermissionTableComponent } from './permission-table/permission-table.component';



@NgModule({
  imports: [
    SharedModule,
    DataTableModule,
    CustomFormsModule,
    ModalModule.forRoot(),
    RouterModule.forChild(permissionRoutes)
  ],
  declarations: [
    PermissionTableComponent,
    PermissionComponent
  ],
  providers: [ PermissionService ]
})
export class PermissionModule { }

