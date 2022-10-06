import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFerramentaComponent } from './add-ferramenta.component';

describe('AddFerramentaComponent', () => {
  let component: AddFerramentaComponent;
  let fixture: ComponentFixture<AddFerramentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFerramentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFerramentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
