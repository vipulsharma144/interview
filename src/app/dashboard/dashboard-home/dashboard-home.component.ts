import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from "@angular/core";
import { NotificationService } from "src/app/core/services/notification.service";
import { Title } from "@angular/platform-browser";
import { NGXLogger } from "ngx-logger";
import { AuthenticationService } from "src/app/core/services/auth.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatStepper } from "@angular/material";
import { unescapeIdentifier } from '@angular/compiler';

@Component({
  selector: "app-dashboard-home",
  templateUrl: "./dashboard-home.component.html",
  styleUrls: ["./dashboard-home.component.css"],
})
export class DashboardHomeComponent implements OnInit, AfterViewInit {
  currentUser: any;
  form: FormGroup;
  disableSubmit;
  isLinear = false;
  stages=[] ;
  stageGroup = [];
  stageStatus = [];
  files = [];
  selectedFiles = [];
  savedProgress = [];
  stepperCompleted = []; //true false array to check if the step is completed ot not
  isEditable = false; //to prevent going back in step
  isApplicationSubmitted;
  totalStages;

  @ViewChild("stepper", { static: false }) mainStepper: MatStepper;
  constructor(
    private notificationService: NotificationService,
    private authService: AuthenticationService,
    private titleService: Title,
    private logger: NGXLogger
  ) {}
  checkIfApplicationSubmitted(){
    var status = localStorage.getItem("applicationSubmitted");
    
    if (status === "true"){
      
      alert("Application already submitted")
      this.isApplicationSubmitted = true
    }else{
      this.isApplicationSubmitted = false
    }
  }
  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.titleService.setTitle("Interview");
    
    this.totalStages = parseInt(localStorage.getItem("totalstages"));
    
    
    var savedValues = JSON.parse(localStorage.getItem("stageValue"))
    if(savedValues != undefined && savedValues != null){
        this.savedProgress = savedValues
    }

    this.getConfiguredStages();
    this.checkIfApplicationSubmitted()
  }
  ngAfterViewInit() {
    this.checkCurrentProgress();
    
  }
  nextStage() {}

  getConfiguredStages() {

    var groupBy = function(xs, key) {
      return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };

    var qstns = JSON.parse(localStorage.getItem("stagesQustions"))
    if(qstns!= null && qstns != undefined){
     var temp = groupBy(qstns,["stage"])
     Object.keys(temp).forEach(stageID => {
        this.stages.push(
          {
            name: temp[stageID][0].name,
            id:stageID,
            questions:temp[stageID]
          }
        )
     });
       
    }
    

    this.stages.forEach((stage, i) => {
      var data = {};

      stage.questions.forEach((qstn, j) => {
        data[qstn.label] = new FormControl("", Validators.required);
      });
      this.stageGroup[i] = new FormGroup(data);
      this.stageStatus[i] = false;
    });
    

    return this.stages;
  }

  saveData(stage) {
    
    var values = this.stageGroup[stage].getRawValue();
    
    if(this.stageGroup[stage].valid){
      this.mainStepper.next()
      this.savedProgress[stage] = values;
      localStorage.setItem("stageValue", JSON.stringify(this.savedProgress));
     
     
  }

 
    
  }

  submitApplication() {
    localStorage.setItem("applicationSubmitted", "true");
    this.isApplicationSubmitted=true;
  }
  onPhotoSelect(event) {
    //this.files.push(...event.addedFiles);
  }
  onPhotoRemove(event) {
    //this.files.splice(this.files.indexOf(event), 1);
  }
  selectFile(e) {}

  resetForm() {
    localStorage.removeItem("stageValue");
    
    this.mainStepper.reset();
    this.savedProgress = [];
  }

  checkCurrentProgress() {
    
    
    if (this.savedProgress === undefined || this.savedProgress === null || this.isApplicationSubmitted) {
      return;
    }else{
      if (this.savedProgress.length < this.totalStages) {
        this.mainStepper.selectedIndex = this.savedProgress.length;
      }
      this.savedProgress.forEach((v, i) => {
        Object.keys(v).forEach((field, j) => {
          this.stageGroup[i].controls[field].setValue(v[field]);
          
          
          if (v[field] != "" && v[field] != null && this.stepperCompleted[i] != false) {
            this.stepperCompleted[i] = true;
          } else {
            this.stepperCompleted[i] = false;
            
            
            this.mainStepper.previous();
          }
        });
      });
    }

    
  }

}
