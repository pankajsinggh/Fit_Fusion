import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutspageComponent } from './workoutspage.component';

describe('WorkoutspageComponent', () => {
  let component: WorkoutspageComponent;
  let fixture: ComponentFixture<WorkoutspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoutspageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkoutspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
