import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { StageListComponent } from './stage-list/stage-list.component';
import { BackendRoutingModule } from './backend-routing.module';
import { AddStageComponent } from './add-stage/add-stage.component';


@NgModule({
  imports: [
    CommonModule,
    BackendRoutingModule,
    SharedModule
  ],
  declarations: [
    StageListComponent,
    AddStageComponent
  ],
  entryComponents: [
  ]
})
export class BackendModule { }
