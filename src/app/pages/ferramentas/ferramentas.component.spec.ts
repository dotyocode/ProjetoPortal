import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FerramentasComponent } from './ferramentas.component';

describe('FerramentasComponent', () => {
  let component: FerramentasComponent;
  let fixture: ComponentFixture<FerramentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FerramentasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FerramentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
