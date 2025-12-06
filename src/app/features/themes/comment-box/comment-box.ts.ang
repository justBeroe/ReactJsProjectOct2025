import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TimeAgoPipe } from '../../../shared/pipes';
import { CommentService } from '../../../core/services/comment.service';

export interface Comment {
  _id?: string;         // MongoDB ObjectId
  text: string;
  created_at: string;
  userId?: string;
  artistId?: number;
}

@Component({
  selector: 'app-comment-box',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TimeAgoPipe],
  templateUrl: './comment-box.html',
  styleUrls: ['./comment-box.css'],
  providers: [CommentService]
})
export class CommentBox implements OnInit {
  @Input() artistId!: number;

  commentControl = new FormControl('');
  comments: Comment[] = [];
  editingIndex: number | null = null;
  currentUserId: string | null = null;

  constructor(
    @Inject(CommentService) private commentService: CommentService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const userData = localStorage.getItem('currentUser');
    if (!userData) return;

    try {
      const user = JSON.parse(userData);
      this.currentUserId = user.id;
    } catch {
      return;
    }

    if (!this.artistId || !this.currentUserId) return;

    // Load from localStorage first
    const stored = localStorage.getItem(this.storageKey());
    this.comments = stored ? JSON.parse(stored) : [];

    // Sync from API
    this.commentService.getByArtist(this.artistId, this.currentUserId)
      .subscribe({
        next: (data: Comment[]) => {
          setTimeout(() => { // Fix ExpressionChangedAfterItHasBeenCheckedError
            this.comments = data || [];
            this.saveToLocalStorage();
            this.cd.detectChanges();
          });
        },
        error: () => {
          // fallback: already loaded from localStorage
        }
      });
  }

  private storageKey(): string {
    return `comments_${this.currentUserId}_${this.artistId}`;
  }

  private saveToLocalStorage() {
    if (!this.currentUserId) return;
    localStorage.setItem(this.storageKey(), JSON.stringify(this.comments));
  }

  addOrUpdateComment() {
    const text = this.commentControl.value?.trim();
    if (!text || !this.currentUserId) return;

    if (this.editingIndex !== null) {
      // UPDATE
      const comment = this.comments[this.editingIndex];
      comment.text = text;

      if (comment._id) {
        this.commentService.update(comment._id, { text }).subscribe({
          next: (res: any) => {
            if (res.comment) this.comments[this.editingIndex!] = res.comment;
            this.saveToLocalStorage();
          },
          error: () => this.saveToLocalStorage()
        });
      } else {
        this.saveToLocalStorage();
      }

      this.editingIndex = null;
    } else {
      // CREATE
      const newComment: Comment = {
        text,
        created_at: new Date().toISOString(),
        userId: this.currentUserId,
        artistId: this.artistId
      };

      // Add locally first
      this.comments.push(newComment);
      this.saveToLocalStorage();

      // Send to API
      this.commentService.create(newComment).subscribe({
        next: (res: any) => {
          const serverComment: Comment = res.comment; // only the comment object
          const idx = this.comments.findIndex(c => c === newComment || c.created_at === newComment.created_at);
          if (idx !== -1) this.comments[idx] = serverComment; // assign _id from server
          this.saveToLocalStorage();
        }
      });
    }

    this.commentControl.setValue('');
  }

  editComment(index: number) {
    this.editingIndex = index;
    this.commentControl.setValue(this.comments[index].text);
  }

  deleteComment(index: number) {
    const comment = this.comments[index];

    // Remove locally
    this.comments.splice(index, 1);
    this.saveToLocalStorage();

    // Delete via API if _id exists
    if (comment._id) {
      this.commentService.delete(comment._id).subscribe({
        next: () => {},
        error: () => {}
      });
    }

    if (this.editingIndex === index) {
      this.editingIndex = null;
      this.commentControl.setValue('');
    }
  }
}
