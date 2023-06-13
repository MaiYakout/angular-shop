import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBidSellerComponent } from './create-bid-seller.component';

describe('CreateBidSellerComponent', () => {
  let component: CreateBidSellerComponent;
  let fixture: ComponentFixture<CreateBidSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBidSellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBidSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
