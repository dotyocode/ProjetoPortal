import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectNoticiaComponent } from './select-noticia.component';

describe('SelectNoticiaComponent', () => {
  let component: SelectNoticiaComponent;
  let fixture: ComponentFixture<SelectNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectNoticiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
