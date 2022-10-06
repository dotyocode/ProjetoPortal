import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasComponentComponent } from './noticias-component.component';

describe('NoticiasComponentComponent', () => {
  let component: NoticiasComponentComponent;
  let fixture: ComponentFixture<NoticiasComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticiasComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiasComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
