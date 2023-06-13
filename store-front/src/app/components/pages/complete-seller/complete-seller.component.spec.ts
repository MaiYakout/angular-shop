import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteSellerComponent } from './complete-seller.component';

describe('CompleteSellerComponent', () => {
  let component: CompleteSellerComponent;
  let fixture: ComponentFixture<CompleteSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteSellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
