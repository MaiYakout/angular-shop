import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedformComponent } from './appliedform.component';

describe('AppliedformComponent', () => {
  let component: AppliedformComponent;
  let fixture: ComponentFixture<AppliedformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppliedformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
