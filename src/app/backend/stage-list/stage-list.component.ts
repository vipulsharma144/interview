import { Component, OnInit,ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';

import { NotificationService } from '../../core/services/notification.service';


const DATA = [
  { position: 1, type: 'text', label: "name", stage: '1' },
  { position: 2, type: 'photo', label: "Passport Pic", stage: '1' },
  { position: 1, type: 'video', label: "bio", stage: '2' },
  { position: 2, type: 'code', label: "Sample Code", stage: '2' },

];
@Component({
  selector: 'app-stage-list',
  templateUrl: './stage-list.component.html',
  styleUrls: ['./stage-list.component.css']
})
export class StageListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'type', 'label','stage','stagename'];
  dataSource;
  stages;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title
  ) { }

  ngOnInit() {
    
    this.stages = [
       
        {
          type:"text",
          label:"Name",
          position:1,
          stage:1,
          name:"First",
          id:1,
        },
        {
          type:"text",
          label:"Surname",
          position:2,
          stage:1,
          name:"First",
          id:1,
        },
        {
          type:"text",
          label:"Class",
          position:1,
          stage:2,
          name:"Second",
          id:2,
        },
        {
          type:"text",
          label:"Section",
          position:1,
          stage:2,
          name:"Second",
          id:2,
        }
      
  
        
    
   
        
        
        
      ]
      this.dataSource = new MatTableDataSource(this.stages);
      this.titleService.setTitle('Stages');
    this.logger.log('Customers loaded');
    this.dataSource.sort = this.sort;
  }

}







