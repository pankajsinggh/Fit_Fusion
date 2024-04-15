import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalCompletionComponent } from './goal-completion.component';

describe('GoalCompletionComponent', () => {
  let component: GoalCompletionComponent;
  let fixture: ComponentFixture<GoalCompletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoalCompletionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoalCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
