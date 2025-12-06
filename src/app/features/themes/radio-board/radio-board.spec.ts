import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioBoard } from './radio-board';

describe('RadioBoard', () => {
  let component: RadioBoard;
  let fixture: ComponentFixture<RadioBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
