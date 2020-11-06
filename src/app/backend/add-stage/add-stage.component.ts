import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-stage',
  templateUrl: './add-stage.component.html',
  styleUrls: ['./add-stage.component.css']
})
export class AddStageComponent implements OnInit {
  form:FormGroup
  types = ["text","photo","video","code"]
  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      type: new FormControl('', Validators.required),
      label: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      stage: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
     
    });
  }

  save(){
    if(this.form.valid){
      var new_val = this.form.getRawValue()
      var questions = JSON.parse(localStorage.getItem("stagesQustions"))
      questions.push(new_val)
      localStorage.setItem("stagesQustions",JSON.stringify(questions))
      alert("Added successfully")
      this.form.reset()
    }
  }

}
