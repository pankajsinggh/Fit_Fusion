import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBMIsComponent } from './get-bmis.component';

describe('GetBMIsComponent', () => {
  let component: GetBMIsComponent;
  let fixture: ComponentFixture<GetBMIsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetBMIsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetBMIsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
