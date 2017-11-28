import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauNoteMissionViewComponent } from './tableau-note-mission-view.component';

describe('TableauNoteMissionViewComponent', () => {
  let component: TableauNoteMissionViewComponent;
  let fixture: ComponentFixture<TableauNoteMissionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableauNoteMissionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauNoteMissionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
