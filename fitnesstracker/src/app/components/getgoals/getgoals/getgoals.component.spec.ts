import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetgoalsComponent } from './getgoals.component';

describe('GetgoalsComponent', () => {
  let component: GetgoalsComponent;
  let fixture: ComponentFixture<GetgoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetgoalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetgoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
