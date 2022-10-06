import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNoticiasComponent } from './add-noticias.component';

describe('AddNoticiasComponent', () => {
  let component: AddNoticiasComponent;
  let fixture: ComponentFixture<AddNoticiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNoticiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
