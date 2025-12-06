import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RadioStation } from '../../../models/radiostation';



@Component({
  selector: 'app-radio-item',
  imports: [CommonModule],
  templateUrl: './radio-item.html',
  styleUrl: './radio-item.css'
})
export class RadioItem implements OnInit {
 @Input() station!: RadioStation;
 @Input() variant: 'compact' | 'full' = 'full';

  constructor() { }

  ngOnInit(): void {
    console.log(this.station);
  }
}

