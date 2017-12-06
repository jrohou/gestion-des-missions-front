import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningMissionsComponent } from './planning-missions.component';

describe('PlanningMissionsComponent', () => {
  let component: PlanningMissionsComponent;
  let fixture: ComponentFixture<PlanningMissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningMissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
