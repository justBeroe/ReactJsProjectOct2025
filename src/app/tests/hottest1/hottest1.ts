import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, share, Subscription } from 'rxjs';

@Component({
  selector: 'app-hottest1',
  imports: [],
  templateUrl: './hottest1.html',
  styleUrl: './hottest1.css'
})
export class Hottest1 implements OnInit, OnDestroy  {
 private subs: Subscription[] = [];

  ngOnInit(): void {
    const hot$ = interval(1000).pipe(share());

    const s1 = hot$.subscribe(v => console.log('S1:', v));
    this.subs.push(s1);

    setTimeout(() => {
      const s2 = hot$.subscribe(v => console.log('S2:', v));
      this.subs.push(s2);
    }, 3000);
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
}
