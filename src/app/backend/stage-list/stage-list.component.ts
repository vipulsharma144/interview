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

  displayedColumns: string[] = ['position', 'type', 'label','stage'];
  dataSource = new MatTableDataSource(DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle('angular-material-template - Customers');
    this.logger.log('Customers loaded');
    this.dataSource.sort = this.sort;

  }

}







