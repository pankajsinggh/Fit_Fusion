import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalspageComponent } from './goalspage.component';

describe('GoalspageComponent', () => {
  let component: GoalspageComponent;
  let fixture: ComponentFixture<GoalspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoalspageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoalspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
