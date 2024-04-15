import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBMIComponent } from './add-bmi.component';

describe('AddBMIComponent', () => {
  let component: AddBMIComponent;
  let fixture: ComponentFixture<AddBMIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBMIComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBMIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
