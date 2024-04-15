import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmichartComponent } from './bmichart.component';

describe('BmichartComponent', () => {
  let component: BmichartComponent;
  let fixture: ComponentFixture<BmichartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BmichartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BmichartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
