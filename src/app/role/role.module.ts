import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PaginationModule, ModalModule } from 'ng2-bootstrap';
import {DataTableModule} from "angular2-datatable";
import {CustomFormsModule} from "ng2-validation";
import { RouterModule } from '@angular/router';

import { RoleService} from './roles-service';
import { roleRoutes } from './role.routes';
import { RoleComponent } from './role.component';
import { RoleTableComponent } from './role-table/role-table.component';



@NgModule({
  imports: [
    SharedModule,
    DataTableModule,
    CustomFormsModule,
    ModalModule.forRoot(),
    RouterModule.forChild(roleRoutes)
  ],
  declarations: [
    RoleTableComponent,
    RoleComponent
  ],
  providers: [ RoleService ]
})
export class RoleModule { }

