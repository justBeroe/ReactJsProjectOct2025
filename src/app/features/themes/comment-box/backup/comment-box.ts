// import { CommonModule } from '@angular/common';
// import { Component, Input, OnInit } from '@angular/core';
// import { FormControl, ReactiveFormsModule } from '@angular/forms';
// import { TimeAgoPipe } from '../../../shared/pipes';

// @Component({
//   selector: 'app-comment-box',
//   imports: [CommonModule, ReactiveFormsModule,TimeAgoPipe],
//   templateUrl: './comment-box.html',
//   styleUrl: './comment-box.css'
// })
// export class CommentBox implements OnInit {
//   @Input() artistId!: number; // Artist ID input from parent component

//   commentControl = new FormControl('');
//   // CHANGED: store objects instead of strings to include created_at
//   // comments: string[] = [];
//   comments: { text: string; created_at: string }[] = []; // <-- ADDED created_at field
//   editingIndex: number | null = null;

//   currentUserId: string | null = null; // Store current logged-in user's ID

//   ngOnInit() {
//     // Get current user data from localStorage
//     const userData = localStorage.getItem('currentUser');
//     if (!userData) {
//       console.warn('No user is logged in.');
//       return; // Stop if no user is logged in
//     }

//     try {
//       const user = JSON.parse(userData);
//       this.currentUserId = user.id; // Store user ID for later use
//     } catch {
//       console.error('Invalid currentUser format in localStorage');
//       return;
//     }

//     if (!this.artistId || !this.currentUserId) return; // Validate inputs

//     // Load comments for current user and current artist only
//     const stored = localStorage.getItem(this.storageKey());
//     this.comments = stored ? JSON.parse(stored) : [];
//   }

//   // Unique storage key combining user ID and artist ID
//   private storageKey(): string {
//     return `comments_${this.currentUserId}_${this.artistId}`;
//   }

//   // Save comments back to localStorage under unique key
//   saveToLocalStorage() {
//     if (!this.currentUserId) return; // Safety check
//     localStorage.setItem(this.storageKey(), JSON.stringify(this.comments));
//   }

//   addOrUpdateComment() {
//     const commentText = this.commentControl.value?.trim();
//     if (!commentText) return;

//     if (this.editingIndex !== null) {
//       // Update existing comment
//       // this.comments[this.editingIndex] = comment;
//          // Update existing comment text only (keep original date)
//       this.comments[this.editingIndex].text = commentText; // <-- CHANGED
//       this.editingIndex = null;
//     } else {
//       // Add new comment
//       // this.comments.push(comment);
//         // Add new comment with created_at date
//       this.comments.push({
//         text: commentText,
//         created_at: new Date().toISOString() // <-- ADDED date field
//       });
//     }

//     this.commentControl.setValue('');
//     this.saveToLocalStorage(); // Save changes for this user+artist only
//   }

//   editComment(index: number) {
//     // this.commentControl.setValue(this.comments[index]);
//     this.commentControl.setValue(this.comments[index].text); // <-- CHANGED
//     this.editingIndex = index;
//   }

//   deleteComment(index: number) {
//     this.comments.splice(index, 1);
//     this.saveToLocalStorage();

//     if (this.editingIndex === index) {
//       this.editingIndex = null;
//       this.commentControl.setValue('');
//     }
//   }
// }