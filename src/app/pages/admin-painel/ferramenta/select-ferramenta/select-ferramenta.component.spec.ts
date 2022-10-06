import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFerramentaComponent } from './select-ferramenta.component';

describe('SelectFerramentaComponent', () => {
  let component: SelectFerramentaComponent;
  let fixture: ComponentFixture<SelectFerramentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectFerramentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFerramentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
