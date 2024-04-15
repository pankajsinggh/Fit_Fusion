import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGoalpageComponent } from './add-goalpage.component';

describe('AddGoalpageComponent', () => {
  let component: AddGoalpageComponent;
  let fixture: ComponentFixture<AddGoalpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddGoalpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddGoalpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
