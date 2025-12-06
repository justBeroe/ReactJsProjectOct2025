import { Component, OnDestroy, OnInit } from '@angular/core';

import { Post } from '../../../models';
import { PostsService } from '../../../core/services/post.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { CommonModule } from '@angular/common';
import { PostItem } from '../post-item/post-item';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-post-board',
  imports: [PostItem, CommonModule],
  // imports: [PostItem, CommonModule],
  templateUrl: './post-board.html',
  styleUrl: './post-board.css'
})
export class PostBoard {
  subscriptions: Subscription[] = [];
  posts: Post[] = [];
  posts$: Observable<Post[]>;

  constructor(private postsService: PostsService) {
    this.posts$ = this.postsService.getPosts();

    this.postsService.getPosts().subscribe((data) => {
     this.posts = data;
    })
  }

  // ngOnInit(): void {

  //   this.subscriptions.push(
  //     //  this.postService.getPosts().pipe(takeUntilDestroyed()).subscribe((posts: Post[]) => {
  //     this.postService.getPosts().subscribe((posts: Post[]) => {
  //       console.log(posts);

  //       this.posts = posts;
  //     })

  //   );


  // }

  // ngOnDestroy(): void {
  //   // throw new Error('Method not implemented.');

  //   console.log('PostBoard destroyed!');


  //   this.subscriptions.forEach(sub => sub.unsubscribe());
  // }
}
