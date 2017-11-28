import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationMissionComponent } from './modification-mission.component';

describe('ModificationMissionComponent', () => {
  let component: ModificationMissionComponent;
  let fixture: ComponentFixture<ModificationMissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificationMissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
