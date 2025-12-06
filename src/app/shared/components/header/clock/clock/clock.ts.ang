import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';



@Component({
  selector: 'app-clock',
  imports: [CommonModule],
  templateUrl: './clock.html',
  styleUrl: './clock.css'
})
export class Clock  {
  private current = signal(new Date());

  constructor() {
    setInterval(() => {
      this.current.set(new Date());
    }, 1000);
  }

  currentTime = computed(() => this.current());
}