import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hottest1 } from './hottest1';

describe('Hottest1', () => {
  let component: Hottest1;
  let fixture: ComponentFixture<Hottest1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hottest1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hottest1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
