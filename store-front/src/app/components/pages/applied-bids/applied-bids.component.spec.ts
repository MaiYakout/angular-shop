import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedBidsComponent } from './applied-bids.component';

describe('AppliedBidsComponent', () => {
  let component: AppliedBidsComponent;
  let fixture: ComponentFixture<AppliedBidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppliedBidsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
