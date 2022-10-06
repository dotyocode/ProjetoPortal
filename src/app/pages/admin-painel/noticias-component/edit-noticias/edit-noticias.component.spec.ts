import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNoticiasComponent } from './edit-noticias.component';

describe('EditNoticiasComponent', () => {
  let component: EditNoticiasComponent;
  let fixture: ComponentFixture<EditNoticiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNoticiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
