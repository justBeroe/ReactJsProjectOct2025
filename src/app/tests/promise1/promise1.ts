import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-promise1',
  imports: [],
  templateUrl: './promise1.html',
  styleUrl: './promise1.css'
})
export class Promise1 {


//  result: string = 'Waiting...';

//   ngOnInit(): void {
//     // Create a Promise
//     const myPromise = new Promise<string>((resolve, reject) => {
//       console.log('Promise started...');
//       setTimeout(() => {
//         resolve('Promise resolved after 3 seconds!');
//       }, 3000);
//     });

//     // Consume the Promise
//     myPromise.then(data => {
//       console.log('Promise then:', data);
//       this.result = data; // Update UI
//     });
//   }


//Fixed below

 result: string = 'Waiting...';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const myPromise = new Promise<string>(resolve => {
      console.log('Promise started...');
      setTimeout(() => resolve('Promise resolved after 3 seconds!'), 3000);
    });

    myPromise.then(data => {
      this.result = data;
       console.log('Promise then:', data);
      this.cdr.detectChanges(); // ✅ Force update
    });
  }
}
