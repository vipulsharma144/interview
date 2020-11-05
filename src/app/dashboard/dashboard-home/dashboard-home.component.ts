import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  currentUser: any;
  form: FormGroup;
  disableSubmit
  textoptions = {
    placeholder : "Enter Name",
    formControlName : "currentName",
    isError :false,
    errorText : "Enter correct Name"
  }
  constructor(private notificationService: NotificationService,
    private authService: AuthenticationService,
    private titleService: Title,
    private logger: NGXLogger) {
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.titleService.setTitle('angular-material-template - Dashboard');
    this.logger.log('Dashboard loaded');

    this.form = new FormGroup({
      currentName: new FormControl('', Validators.required),
     
    });


    setTimeout(() => {
      this.notificationService.openSnackBar('Welcome!');
    });
  }
  nextStage(){

  }
}
