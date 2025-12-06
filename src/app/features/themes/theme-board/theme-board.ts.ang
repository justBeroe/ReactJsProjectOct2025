import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ThemeItem } from '../theme-item/theme-item';
import { BehaviorSubject, catchError, map, Observable, of, Subscription, switchMap } from 'rxjs';
import { Song } from '../../../models/song.model';
import { SongService } from '../../../core/services/song.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-theme-board',
  imports: [ThemeItem, CommonModule],
  // imports: [ThemeItem, CommonModule],
  templateUrl: './theme-board.html',
  styleUrl: './theme-board.css'
})
export class ThemeBoard {
  // export class ThemeBoard implements OnInit, OnDestroy {

  // subscriptions: Subscription[] = [];
  songs: Song[] = [];
  // themes$: Observable<Song[]>;
  @Input() artistId!: number;
  // songs$: Observable<Song[]> = new Observable<Song[]>();
  // songs$: Observable<Song[]> = of([]);

  // BehaviorSubject to manage the songs list
  private songsSubject = new BehaviorSubject<Song[]>([]);
  songs$: Observable<Song[]> = this.songsSubject.asObservable();

  constructor(private route: ActivatedRoute, private songService: SongService, private router: Router) {
    // Optionally initialize the observable property for async pipe
    // this.themes$ = this.songService.getSongs();
    //  this.themes$ = this.songService.getSongsWithID(this.artistId);
  }

  //   ngOnInit(): void {
  //   this.route.paramMap.subscribe(params => {
  //     const artistId = Number(params.get('artistId'));
  //     console.log(artistId);




  //     // Otherwise, load songs
  //     // this.songs$ = this.songService.getSongsWithID(artistId);
  //      this.songService.getSongsWithID(artistId).subscribe({
  //       next: (songs) => {
  //         if (!songs || songs.length === 0) {
  //           this.router.navigate(['/not-found']); // redirect if no songs
  //         } else {
  //           this.songs$ = of(songs); // assign for async pipe
  //         }
  //       },
  //       error: () => {
  //         this.router.navigate(['/not-found']); // redirect on error
  //       }
  //     });
  //   });  
  // }

  // ngOnInit(): void {
  //   // this.themeService.getThemes().pipe(takeUntilDestroyed()).subscribe((themes: Theme[]) => {

  //   this.subscriptions.push(

  //     this.themeService.getThemes().subscribe((themes: Theme[]) => {
  //      console.log(themes); // ---> Themes received !! Troubleshooting

  //       this.themes = themes;
  //     })
  //   );


  // }

  // ngOnDestroy(): void {
  //   // throw new Error('Method not implemented.');
  //   console.log('ThemeBoard destroyed!');

  //   this.subscriptions.forEach(sub => sub.unsubscribe());
  // }

  /////

  ////


  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const artistId = Number(params.get('artistId'));
        return this.songService.getSongsWithIDMongoDB(artistId).pipe(
          catchError(() => {
            this.router.navigate(['/not-found']);
            return of([]);
          })
        );
      })
    ).subscribe(songs => {
      if (!songs || songs.length === 0) {
        this.router.navigate(['/not-found']);
      } else {
        this.songsSubject.next(songs); // ✅ Ensures template updates via BehaviorSubject
      }
    });
  }




onSongUpdated(updatedSong: Song) {
  this.songService.getSongsWithIDMongoDB(updatedSong.artist.id).subscribe({
    next: (freshSongs: Song[]) => {
      // Find the updated song in the array
      const freshSong = freshSongs.find(s => s._id === updatedSong._id);
      if (!freshSong) return;

      const currentSongs = this.songsSubject.getValue();
      const updatedSongs = currentSongs.map(s =>
        s._id === freshSong._id ? freshSong : s
      );
      this.songsSubject.next(updatedSongs); // ✅ update template
      console.log('Song refreshed from MongoDB in parent:', freshSong);
    },
    error: (err) => console.error('Failed to fetch songs from DB', err)
  });
}
 // ✅ trackBy function for ngFor
  trackById(index: number, song: Song) {
    return song._id;
  }

}

