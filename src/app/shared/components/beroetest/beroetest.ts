import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-beroetest',
   standalone: true,
  imports: [CommonModule],// ✅ Required for *ngIf and *ngFor
  templateUrl: './beroetest.html',
  styleUrl: './beroetest.css'
})
export class Beroetest implements OnInit {

  stringObservable$!: Observable<string>;

  

  ngOnInit(): void {
    localStorage.setItem("name","SAMOBEROE");
    const nameBeroe = localStorage.getItem("name");
    this.stringObservable$ = of('Hello from Observable ' + nameBeroe);

    this.stringObservable$.subscribe(value => {
      console.log('String Observable:', value);
    });
  }


}
