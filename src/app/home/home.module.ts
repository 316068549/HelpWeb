import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ng2-bootstrap';
import { SharedModule } from '../shared/shared.module';

import { LeftNavComponent } from '../left-nav/left-nav.component';
import { HomeComponent } from './home.component';
import { MenuService} from '../shared-service/menu-service';

import { workspaceRoutes } from './home.routes';
import { ParentsmenuesPipe } from '../left-nav/left-nav.pipe';
import { MonitorComponent } from '../monitor/monitor.component';
import { GaodeMapComponent } from '../monitor/gaode-map/gaode-map.component';
import { HelpComponent } from '../help/help.component';
import { VideoComponent } from '../monitor/video/video.component';

@NgModule({
  imports: [
    SharedModule,
    ModalModule.forRoot(),
    RouterModule.forChild(workspaceRoutes)
  ],
  exports: [],
  declarations: [
    HomeComponent,
    LeftNavComponent,
    ParentsmenuesPipe,
    MonitorComponent,
    GaodeMapComponent,
    HelpComponent,
    VideoComponent
  ],
  providers: [MenuService],
})
export class WorkspaceModule { }
