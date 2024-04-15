import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifybmiComponent } from './classifybmi.component';

describe('ClassifybmiComponent', () => {
  let component: ClassifybmiComponent;
  let fixture: ComponentFixture<ClassifybmiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassifybmiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClassifybmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
