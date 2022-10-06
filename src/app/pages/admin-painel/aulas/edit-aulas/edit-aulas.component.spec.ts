import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAulasComponent } from './edit-aulas.component';

describe('EditAulasComponent', () => {
  let component: EditAulasComponent;
  let fixture: ComponentFixture<EditAulasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAulasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
