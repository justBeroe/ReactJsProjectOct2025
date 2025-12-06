import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSong } from './edit-song';

describe('EditSong', () => {
  let component: EditSong;
  let fixture: ComponentFixture<EditSong>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSong]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSong);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
