import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetWorkoutsComponent } from './get-workouts.component';

describe('GetWorkoutsComponent', () => {
  let component: GetWorkoutsComponent;
  let fixture: ComponentFixture<GetWorkoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetWorkoutsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetWorkoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
