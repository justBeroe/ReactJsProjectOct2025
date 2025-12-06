import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SongService } from '../../../core/services/song.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-song',
  imports: [CommonModule,
    FormsModule,        // ✅ Add this
    ReactiveFormsModule],
  templateUrl: './edit-song.html',
  styleUrl: './edit-song.css'
})
export class EditSong {
  @Input() song: any;               // receive song from parent
  @Output() onUpdated = new EventEmitter<any>(); // notify parent after update

  constructor(private songService: SongService) { }

  saveChanges() {
    this.songService.updateSong(this.song._id, this.song).subscribe({
      next: (updatedSong) => {
        alert('Song updated successfully!');
        this.onUpdated.emit(updatedSong); // tell parent to refresh or close edit mode
      },
      error: (err) => console.error('Update failed', err)
    });
  }

  cancelEdit() {
    this.onUpdated.emit(null); // cancel editing
  }
}
