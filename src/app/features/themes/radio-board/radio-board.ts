import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { RadioItem } from '../radio-item/radio-item';
import { HttpClient } from '@angular/common/http';
import { RadioStation } from '../../../models/radiostation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-radio-board',
  imports: [RadioItem, CommonModule],
  templateUrl: './radio-board.html',
  styleUrl: './radio-board.css'
})
export class RadioBoard implements OnInit {
  stations$: Observable<RadioStation[]> = of([]);

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.stations$ = this.http.get<RadioStation[]>('http://localhost:4000/api/top-radio-stations')
      .pipe(
        catchError(error => {
          console.error('Error fetching radio stations', error);
          return of([]);
        })
      );
  }

}
