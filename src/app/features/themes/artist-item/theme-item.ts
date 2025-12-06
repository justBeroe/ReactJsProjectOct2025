import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Theme } from '../../../models';
import { CommonModule } from '@angular/common';
import { Song2 } from '../../../models/song2.model';
import { Artist } from '../../../models/artist.model';
import { CommentBox } from '../comment-box/comment-box';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-theme-item',
  imports: [CommonModule, CommentBox,RouterModule],
  templateUrl: './theme-item.html',
  styleUrl: './theme-item.css'
})
export class ArtistItem implements OnInit, AfterViewInit {

  //@Input and @Output are decorators that help pass data between components
  // @Input() theme!: Theme;
  @Input() artist!: Artist;
  //@Input() artistj!: Artist;
  //@Input(): Parent ➡️ Child
  // Purpose:
  // Allows a child component to receive data from its parent component.

  @Input() variant: 'compact' | 'full' = 'full';
  
  constructor() {
    console.log(this.artist);
    

  }

  ngOnInit(): void {
    console.log(this.artist);
   
  }

  ngAfterViewInit(): void {
    console.log(this.artist);
    
  }
}
