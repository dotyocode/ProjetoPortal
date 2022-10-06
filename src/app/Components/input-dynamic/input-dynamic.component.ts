import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InputType } from 'src/app/shared/model/input-type';


@Component({
  selector: 'app-input-dynamic',
  templateUrl: './input-dynamic.component.html',
  styleUrls: ['./input-dynamic.component.css']
})
export class InputDynamicComponent implements OnInit {

  @Input() inputType: InputType = { name: 'input-autenticacao' }
  @Input() placeHolder: any;
  @Input() tipo: any;
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() readonly: boolean = false;
  @Input() nameFormGroup: FormGroup = this.formBuilder.group({})
  @Input() isInvalid: boolean = false;
  @Input() maxLenght: any;

  @Output() validTouched: EventEmitter<string> = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  inputTrim(value: string, name: string): void {
    this.nameFormGroup.get(name)?.setValue(value.trim());
  }

  getValidTouched(field: string): void {
    this.validTouched.emit(field)
  }

}
