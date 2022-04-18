import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoekenComponent } from './boeken.component';

describe('BoekenComponent', () => {
  let component: BoekenComponent;
  let fixture: ComponentFixture<BoekenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoekenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoekenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
