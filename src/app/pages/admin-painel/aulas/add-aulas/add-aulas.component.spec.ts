import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAulasComponent } from './add-aulas.component';

describe('AddAulasComponent', () => {
  let component: AddAulasComponent;
  let fixture: ComponentFixture<AddAulasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAulasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
