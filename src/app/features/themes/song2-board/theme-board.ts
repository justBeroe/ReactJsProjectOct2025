import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

import { CommonModule } from '@angular/common';

import { catchError, Observable, of, Subscription, switchMap } from 'rxjs';
import { SongService } from '../../../core/services/song.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Song2 } from '../../../models/song2.model';
import { ThemeItem2 } from '../song2-item/theme-item';

@Component({
  selector: 'app-theme-board',
  imports: [ThemeItem2, CommonModule],
  // imports: [ThemeItem, CommonModule],
  templateUrl: './theme-board.html',
  styleUrl: './theme-board.css'
})
export class ThemeBoard2{
// export class ThemeBoard implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  song2: Song2[] = [];
  // themes$: Observable<Song[]>;
  @Input() artistId!: number;
  // song2$: Observable<Song2[]> = new Observable<Song2[]>();
  song2$: Observable<Song2[]> = of([]);

 constructor(private route: ActivatedRoute,private songService: SongService, private router: Router  ) 
 {
       // Optionally initialize the observable property for async pipe
    // this.themes$ = this.songService.getSongs();
    //  this.themes$ = this.songService.getSongsWithID(this.artistId);
  }

//   ngOnInit(): void {
//   this.route.paramMap.subscribe(params => {
//     const artistId = Number(params.get('artistId'));
//     if (artistId) {
//       this.song2$ = this.songService.getSongsWithID2(artistId);
//     }
//   });
// }

ngOnInit(): void {
    this.song2$ = this.route.paramMap.pipe(
      switchMap(params => {
        const artistId = Number(params.get('artistId'));
        return this.songService.getSongsWithID2(artistId).pipe(
          switchMap(songs => {
            if (!songs || songs.length === 0) {
              this.router.navigate(['/not-found']);
              return of([]); // return empty observable to satisfy type
            }
            return of(songs);
          }),
          catchError(() => { //This handles any error thrown by the HTTP request, like 404, 500, or network failure.
            this.router.navigate(['/not-found']);
            return of([]);
          })
        );
      })
    );
  }


}
