import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BMIspageComponent } from './bmispage.component';

describe('BMIspageComponent', () => {
  let component: BMIspageComponent;
  let fixture: ComponentFixture<BMIspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BMIspageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BMIspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
