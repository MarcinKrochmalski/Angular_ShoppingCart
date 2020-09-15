import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PopupDataModel } from '../../models/popup-data.model';
import { FormConfig } from '../../config/form.config';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: []
})
export class FormComponent implements OnInit {

  @Input() active: boolean;
  @Input() texts: any;
  @Input() toPay: number;
  @Output() StepEmitter = new EventEmitter<number>();
  @Output() PopupEmitter = new EventEmitter<PopupDataModel>();
  @Output() SendEmitter = new EventEmitter<{}>();

  formFields = FormConfig;
  form: FormGroup;

  constructor() { }

  handleFocus(fieldName: string): void {

    const index = this.formFields.findIndex((field) => field.name === fieldName)
    this.formFields[index].message = ""

  }

  handleCheckboxChange(fieldName: string, checked: boolean) {

    this.form.patchValue({ [fieldName]: checked ? 'checked' : '' });
    this.checkField(fieldName);

  }


  checkField(fieldName: string): void {

    const index = this.formFields.findIndex((field) => field.name === fieldName)

    this.formFields[index].error = this.form.get(fieldName).invalid

    if (this.formFields[index].error)

      this.formFields[index].message = this.texts?.messages?.errors[fieldName];

    else

      this.formFields[index].message = "";

  }

  handleSubmit(): void {

    if (this.form.status === 'VALID') {

      this.SendEmitter.emit(this.form.value);

    } else {

      this.formFields.forEach(field => this.checkField(field.name));

      this.PopupEmitter.emit({
        active: true,
        message: this.texts?.messages?.errors?.incorrect,
        activeButton: true
      });

    }

  }

  switchSteps(step: number): void {

    this.StepEmitter.emit(step);

  }

  ngOnInit(): void {

    const fields = {};

    this.formFields.forEach(field => {

      const validators = [Validators.required];

      if (field.type === 'email')

        validators.push(Validators.email);

      else if (field.type === 'number')

        validators.push(Validators.minLength(9), Validators.maxLength(12));

      else

        validators.push(Validators.minLength(2));


      fields[field.name] = new FormControl('', validators);


    })

    this.form = new FormGroup(fields);


  }


}
