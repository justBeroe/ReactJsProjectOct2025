import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Promise1 } from './promise1';

describe('Promise1', () => {
  let component: Promise1;
  let fixture: ComponentFixture<Promise1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Promise1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Promise1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
