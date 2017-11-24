import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimesComponent } from './primes.component';

describe('PrimesComponent', () => {
  let component: PrimesComponent;
  let fixture: ComponentFixture<PrimesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
