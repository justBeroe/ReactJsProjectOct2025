import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Theme } from '../../../models';
import { CommonModule } from '@angular/common';
import { Song2 } from '../../../models/song2.model';


@Component({
  selector: 'app-theme-item',
  imports: [CommonModule],
  templateUrl: './theme-item.html',
  styleUrl: './theme-item.css'
})
export class ThemeItem2 implements OnInit, AfterViewInit {

  //@Input and @Output are decorators that help pass data between components
  // @Input() theme!: Theme;
  @Input() song2!: Song2;
  //@Input(): Parent ➡️ Child
  // Purpose:
  // Allows a child component to receive data from its parent component.

  @Input() variant: 'compact' | 'full' = 'full';
  
  constructor() {
    console.log(this.song2);

  }

  ngOnInit(): void {
    console.log(this.song2);
  }

  ngAfterViewInit(): void {
    console.log(this.song2);
  }
}
