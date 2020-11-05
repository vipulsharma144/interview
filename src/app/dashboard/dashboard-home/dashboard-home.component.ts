import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  currentUser: any;
  form: FormGroup;
  disableSubmit;
  isLinear = true;
  stages;
  stageGroup=[]

  textoptions = {
    placeholder : "Enter Name",
    formControlName : "currentName",
    isError :false,
    errorText : "Enter correct Name"
  }
  firstStageGroup: FormGroup;
  secondStageGroup: FormGroup;
  
  

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


   
    this.secondStageGroup = new FormGroup({
      secondCtrl:new FormControl('', Validators.required),
    });
    this.getConfiguredStages();
  }
  nextStage(){

  }

  getConfiguredStages(){
    this.stages = [
    {  name:"First",
      id:1,
      questions:[{
        type:"text",
        label:"Name",
        position:1,
        stage:1
      },
      {
        type:"text",
        label:"Surname",
        position:2,
        stage:1
      }]
    },

    {  name:"Second",
    id:2,
    questions:[{
      type:"text",
      label:"Class",
      position:1,
      stage:2
    },
    {
      type:"text",
      label:"Section",
      position:1,
      stage:2
    }]
  }
      
      
      
    ]
    
    this.stages.forEach((stage,i)=>{
      var data = {}

      stage.questions.forEach((qstn,j)=>{
        data[qstn.label]  = new FormControl('', Validators.required)
        
      })
      this.stageGroup[i] = new FormGroup(data)
    })
    console.log(this.stageGroup);
    
    return this.stages;
  }
}
