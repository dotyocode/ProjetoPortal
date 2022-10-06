import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProfessorComponent } from './select-professor.component';

describe('SelectProfessorComponent', () => {
  let component: SelectProfessorComponent;
  let fixture: ComponentFixture<SelectProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectProfessorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
