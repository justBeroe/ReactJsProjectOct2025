import { Component, Input } from '@angular/core';
import { Post } from '../../../models';

@Component({
  selector: 'app-post-item',
  imports: [],
  //standalone: true,
  templateUrl: './post-item.html',
  styleUrl: './post-item.css'
})
export class PostItem {

  //This post property will get its value from a parent component using property binding.
  @Input() post!: Post;

  @Input() postTest!: string;

  //In child component --> Declares a property for data
  // [input] in parent template --> Sends data to the child component

  // Example explain: !

  //@Input() = Parent → Child (data flows down)

  //@Output() = Child → Parent (events go up)
}
