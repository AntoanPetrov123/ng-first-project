import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsNewPageComponent } from './cars-new-page.component';

describe('CarsNewPageComponent', () => {
  let component: CarsNewPageComponent;
  let fixture: ComponentFixture<CarsNewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarsNewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsNewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
