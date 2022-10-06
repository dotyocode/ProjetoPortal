import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCursoComponent } from './select-curso.component';

describe('SelectCursoComponent', () => {
  let component: SelectCursoComponent;
  let fixture: ComponentFixture<SelectCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
