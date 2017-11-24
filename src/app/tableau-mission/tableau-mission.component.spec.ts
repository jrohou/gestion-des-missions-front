import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauMissionComponent } from './tableau-mission.component';

describe('TableauMissionComponent', () => {
  let component: TableauMissionComponent;
  let fixture: ComponentFixture<TableauMissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableauMissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
