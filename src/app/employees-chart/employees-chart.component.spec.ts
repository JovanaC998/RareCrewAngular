import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesChartComponent } from './employees-chart.component';

describe('EmployeesChartComponent', () => {
  let component: EmployeesChartComponent;
  let fixture: ComponentFixture<EmployeesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
