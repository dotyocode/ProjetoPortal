import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAulasComponent } from './select-aulas.component';

describe('SelectAulasComponent', () => {
  let component: SelectAulasComponent;
  let fixture: ComponentFixture<SelectAulasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectAulasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
