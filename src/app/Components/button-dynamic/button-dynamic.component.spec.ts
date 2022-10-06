import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDynamicComponent } from './button-dynamic.component';

describe('ButtonDynamicComponent', () => {
  let component: ButtonDynamicComponent;
  let fixture: ComponentFixture<ButtonDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonDynamicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
