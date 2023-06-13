import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TobbarsellerComponent } from './tobbarseller.component';

describe('TobbarsellerComponent', () => {
  let component: TobbarsellerComponent;
  let fixture: ComponentFixture<TobbarsellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TobbarsellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TobbarsellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
