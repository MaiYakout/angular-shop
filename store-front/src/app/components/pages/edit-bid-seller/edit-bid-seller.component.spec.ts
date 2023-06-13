import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBidSellerComponent } from './edit-bid-seller.component';

describe('EditBidSellerComponent', () => {
  let component: EditBidSellerComponent;
  let fixture: ComponentFixture<EditBidSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBidSellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBidSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
