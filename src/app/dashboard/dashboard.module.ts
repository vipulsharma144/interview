import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import {MatProgressBarModule} from '@angular/material';
import { TextComponent } from './inputs/text/text.component';
import { PhotoComponent } from './inputs/photo/photo.component';
import { VideoComponent } from './inputs/video/video.component';
import { CodeComponent } from './inputs/code/code.component'
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FileComponent } from './inputs/file/file.component';
import {MatStepperModule} from '@angular/material/stepper';

@NgModule({
  declarations: [DashboardHomeComponent, TextComponent, PhotoComponent, VideoComponent, CodeComponent, FileComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MatProgressBarModule,
    NgxDropzoneModule,
    MatStepperModule
    
    
  ],
  entryComponents: [TextComponent, PhotoComponent, VideoComponent, CodeComponent]
})
export class DashboardModule { }
