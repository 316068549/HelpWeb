import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ng2-bootstrap';
import {DataTableModule} from "angular2-datatable";
import {CustomFormsModule} from "ng2-validation";


// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserLoginService } from './login/user-login.service';
import { appRoutes } from './app.routes';
import { TestComponent } from './test/test.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TestComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    DataTableModule,
    CustomFormsModule,
    ReactiveFormsModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
    AlertModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserLoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }


