import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Theme } from '../../../models';
import { CommonModule } from '@angular/common';
import { Song } from '../../../models/song.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from '../../../core/services/song.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-theme-item',
  imports: [CommonModule, FormsModule,        // ✅ Add this
    ReactiveFormsModule],
  templateUrl: './theme-item.html',
  styleUrl: './theme-item.css'
})
export class ThemeItem implements OnInit, AfterViewInit {

  //@Input and @Output are decorators that help pass data between components
  // @Input() theme!: Theme;
  @Input() song!: Song;
  //@Input(): Parent ➡️ Child
  // Purpose:
  // Allows a child component to receive data from its parent component.
  isEditMode: boolean = false;
  editForm!: FormGroup;
  @Output() songUpdated = new EventEmitter<Song>();
  @Input() variant: 'compact' | 'full' = 'full';

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private songService: SongService,
    private router: Router,
    private cdRef: ChangeDetectorRef

  ) {
    console.log(this.song);

  }

  ngOnInit(): void {
    console.log(this.song);
    this.initForm();
  }

  initForm() {
    this.editForm = this.fb.group({
      artistName: [this.song.artist.name],
      albumTitle: [this.song.album.title]
    });
  }

  ngAfterViewInit(): void {
    console.log(this.song);
  }

  onEdit() {
    this.isEditMode = true;
    this.initForm(); // populate form with current song data
  }

  onCancel() {
    this.isEditMode = false;
  }

  onSave() {
    const updatedData = {
      artist: { ...this.song.artist, name: this.editForm.value.artistName },
      album: { ...this.song.album, title: this.editForm.value.albumTitle }
    };

    this.songService.updateSong(this.song._id, updatedData).subscribe({
      next: (updatedSong) => {
        //alert('Song updated successfully!');
        // this.isEditMode = false;
        // window.location.reload(); // optional
        // ✅ Update only this.song instead of reloading whole page
        // this.song = updatedSong;
        // Make sure artist & album are included
        this.song = {
          ...this.song,           // keep old data
          ...updatedSong,         // overwrite with updated fields
          artist: updatedSong.artist || this.song.artist,
          album: updatedSong.album || this.song.album
        };




        // ✅ Close edit mode
        this.isEditMode = false;
        // ✅ trigger manual change detection
        this.cdRef.detectChanges();

        // Notify parent
        this.songUpdated.emit(this.song);
      },
      error: (err) => console.error('Update failed', err)
    });
  }

  // Delete song
  deleteSong(songId: number) {
    if (confirm('Are you sure you want to delete this song?')) {
      this.songService.deleteSong(songId).subscribe({
        next: () => {
          alert('Song deleted successfully!');
          // Optionally refresh the list
          // Refresh the page
          window.location.reload();
        },
        error: (err) => console.error('Delete failed', err)
      });
    }
  }



}
