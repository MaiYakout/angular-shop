import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMunaqesComponent } from './about-munaqes.component';

describe('AboutMunaqesComponent', () => {
  let component: AboutMunaqesComponent;
  let fixture: ComponentFixture<AboutMunaqesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutMunaqesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutMunaqesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
