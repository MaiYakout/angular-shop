import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBidsComponent } from './create-bids.component';

describe('CreateBidsComponent', () => {
  let component: CreateBidsComponent;
  let fixture: ComponentFixture<CreateBidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBidsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
