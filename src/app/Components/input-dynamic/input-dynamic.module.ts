import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputDynamicComponent } from './input-dynamic.component';



@NgModule({
  declarations: [InputDynamicComponent],
  exports: [InputDynamicComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InputDynamicModule { }
