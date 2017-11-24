import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauNaturesComponent } from './tableau-natures.component';

describe('TableauNaturesComponent', () => {
  let component: TableauNaturesComponent;
  let fixture: ComponentFixture<TableauNaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableauNaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauNaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
