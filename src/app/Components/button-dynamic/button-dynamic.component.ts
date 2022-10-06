import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';
import { ButtonType } from 'src/app/shared/model/button-type';

@Component({
  selector: 'app-button-dynamic',
  templateUrl: './button-dynamic.component.html',
  styleUrls: ['./button-dynamic.component.css']
})
export class ButtonDynamicComponent implements OnChanges {

  @Input() buttonType: ButtonType = { name: 'button-normal' }
  @Input() type: string = 'button';
  @Input() id: string = '';
  @Input() title: string = '';
  @Input() autentication: boolean = false;
  @Input() normalButton: boolean = false;
  @Input() borderOnly: boolean = false;
  @Input() textButton: boolean = false;
  @Input() icon: boolean = false;
  @Input() classes: string = '';
  @Input() action: string = '';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;

  @Output() buttonFunction: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {

  }

  buttonSendFunction(event: Event, disabled?: boolean): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.action && !disabled) {
      this.buttonFunction.emit(this.action)
    }
  }

}
