import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Beroetest } from './beroetest';

describe('Beroetest', () => {
  let component: Beroetest;
  let fixture: ComponentFixture<Beroetest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Beroetest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Beroetest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
