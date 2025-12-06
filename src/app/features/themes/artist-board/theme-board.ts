import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

import { CommonModule } from '@angular/common';

import { BehaviorSubject, combineLatest, map, Observable, Subscription } from 'rxjs';
import { SongService } from '../../../core/services/song.service';
import { ActivatedRoute } from '@angular/router';
import { Song2 } from '../../../models/song2.model';
import { ThemeItem2 } from '../song2-item/theme-item';
import { ArtistService } from '../../../core/services/artist.service';
import { Artist } from '../../../models/artist.model';
import { ArtistItem } from '../artist-item/theme-item';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-theme-board',
  imports: [CommonModule, ArtistItem, FormsModule],
  // imports: [CommonModule],
  templateUrl: './theme-board.html',
  styleUrl: './theme-board.css'
})
export class ArtistBoard {
  // export class ThemeBoard implements OnInit, OnDestroy {
  searchTerm: string = ''; // string for ngModel binding
  subscriptions: Subscription[] = [];
  artist: Artist[] = [];
  // themes$: Observable<Song[]>;
  @Input() artistId!: number;
  artistd$!: Observable<Artist[]>;
  artistj$!: Observable<Artist[]>;
  backendUrl = 'http://localhost:4000'; // ✅ backend variable

  // Filter input
  searchTerm$ = new BehaviorSubject<string>(''); // store the current search term

  // Filtered artist streams
  filteredArtistd$!: Observable<Artist[]>;
  filteredArtistj$!: Observable<Artist[]>;

  constructor(private route: ActivatedRoute,
    private artistService: ArtistService,
    private http: HttpClient // ✅ inject HttpClient
  ) {

  }

  ngOnInit(): void {

    this.artistd$ = this.artistService.getDeezerArtists();
    this.artistj$ = this.artistService.getJamenArtists();

    // Log emitted values
    this.artistd$.subscribe(artists => console.log('Deezer artists:', artists));
    this.artistj$.subscribe(artists => console.log('Jamendo artists:', artists));

    // Combine artist observable with searchTerm$
    this.filteredArtistd$ = combineLatest([this.artistd$, this.searchTerm$]).pipe(
      map(([artists, term]) =>
        artists.filter(a => a.name.toLowerCase().includes(term.toLowerCase()))
      )
    );

    this.filteredArtistj$ = combineLatest([this.artistj$, this.searchTerm$]).pipe(
      map(([artists, term]) =>
        artists.filter(a => a.name.toLowerCase().includes(term.toLowerCase()))
      )
    );

  }

  onSearch(term: string) {
    this.searchTerm$.next(term);
    console.log('Search term:', term);
  //  this.searchTerm$.subscribe(term => console.log('searchTerm$ emits:', term));

  }

  fetchDeezerAll() {
    this.http
      .get<{ message: string; totalTracks: number }>(
        `${this.backendUrl}/api/fetch-deezer-all?start=1&end=100`
      )
      .subscribe({
        next: (res) => {
          alert(`${res.message}\nTotal tracks: ${res.totalTracks}`);
          // ✅ reload artists after fetch
          this.artistd$ = this.artistService.getDeezerArtists();
        },
        error: (err) => {
          console.error('Failed to fetch Deezer artists:', err);
          alert('❌ Failed to fetch Deezer artists');
        }
      });
  }

  ///

  deleteAllSongs() {
    if (!confirm('⚠️ Are you sure you want to delete all songs? This cannot be undone.')) {
      return;
    }

    this.http
      .delete<{ message: string; deletedCount: number }>(`${this.backendUrl}/api/delete-songs`)
      .subscribe({
        next: (res) => {
          alert(`${res.message}\nDeleted count: ${res.deletedCount}`);
          // ✅ Optionally reload songs/artists
          this.artistd$ = this.artistService.getDeezerArtists();
        },
        error: (err) => {
          console.error('Failed to delete songs:', err);
          alert('❌ Failed to delete songs');
        }
      });
  }


}
