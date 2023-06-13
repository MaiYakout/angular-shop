import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TobbarBidsComponent } from './tobbar-bids.component';

describe('TobbarBidsComponent', () => {
  let component: TobbarBidsComponent;
  let fixture: ComponentFixture<TobbarBidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TobbarBidsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TobbarBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
