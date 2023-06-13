import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvilableBidsComponent } from './avilable-bids.component';

describe('AvilableBidsComponent', () => {
  let component: AvilableBidsComponent;
  let fixture: ComponentFixture<AvilableBidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvilableBidsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvilableBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
