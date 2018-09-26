import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleReportCardComponent } from './vehicle-report-card.component';

describe('VehicleReportCardComponent', () => {
  let component: VehicleReportCardComponent;
  let fixture: ComponentFixture<VehicleReportCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleReportCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleReportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
