import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonDynamicComponent } from './button-dynamic.component';



@NgModule({
  declarations: [ButtonDynamicComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ButtonDynamicComponent]
})
export class ButtonDynamicModule { }
