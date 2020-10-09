import { PostsService } from './../posts.service';
import { Post } from './../post.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  constructor(public PostsServicee: PostsService, private AuthServicee: AuthService) { }

  posts: Post[] = [];
  postsSub: Subscription;
  isLoading = true;
  preview;

  userId;
  totalPosts = 0;
  postsPerPage = 2;
  cuurentPage = 1;
  postsPerPageOptions = [2, 5, 10, 20];
  isAuthenticated;
  authSubscription: Subscription;

  deletePost(postid): any {
    this.PostsServicee.deletePost(postid).subscribe((dataa) => {
      this.PostsServicee.getPosts(this.postsPerPage, this.cuurentPage);
    });
    // this.PostsServicee.updatedPostListener.subscribe((dataa) => {
    //   this.posts = dataa;
    // });
  }

  onPagenation(e: PageEvent): any {
    this.postsPerPage = e.pageSize;
    this.cuurentPage = e.pageIndex + 1;
    this.PostsServicee.getPosts(this.postsPerPage, this.cuurentPage);
  }

  ngOnInit(): any {
    this.isLoading = true;
    this.PostsServicee.getPosts(this.postsPerPage, this.cuurentPage);
    this.userId = this.AuthServicee.getUserId();
    this.postsSub = this.PostsServicee.updatedPostListener.subscribe((dataa: any) => {
      this.isLoading = false;
      this.posts = dataa.posts;
      this.preview = dataa.imagePath;
      this.totalPosts = dataa.maxPosts;
    });
    this.authSubscription = this.AuthServicee.getAuthStatusListener().subscribe((dataa) => {
      this.isAuthenticated = dataa;
    });
  }

  ngOnDestroy(): any {
    this.postsSub.unsubscribe();
    this.authSubscription.unsubscribe();
  }

}
