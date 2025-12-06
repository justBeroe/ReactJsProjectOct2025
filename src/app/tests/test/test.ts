import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, share, Subscription } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.html',
  styleUrls: ['./test.css']
})
export class TestComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];

  ngOnInit(): void {
    // 1) Base source: emits 0,1,2,3,... every 1000 ms
    // `interval` by itself is **cold** (each subscriber gets its own counter).
    const source$ = interval(1000)
      // 2) `share()` turns the cold source into a **multicasted** (hot) stream.
      // One producer is shared by all subscribers; they see the SAME ticks.
      .pipe(share());

    // Subscriber #1 — starts the producer
    const s1 = source$.subscribe(v => console.log('S1:', v));
    this.subs.push(s1);

    // Subscriber #2 joins after 3s — it DOES NOT start from 0
    setTimeout(() => {
      const s2 = source$.subscribe(v => console.log('S2:', v));
      this.subs.push(s2);
    }, 3000);
  }

  ngOnDestroy(): void {
    // Clean up: stop receiving values and (with share) stop the producer when last unsubscribes
    this.subs.forEach(s => s.unsubscribe());
  }
}
