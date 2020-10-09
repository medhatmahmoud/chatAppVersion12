import { BehaviorSubject } from 'rxjs';
import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(public http: HttpClient, public router: Router) { }
  posts: Post[] = [];

  updatedPost = new BehaviorSubject(this.posts);
  updatedPostListener = this.updatedPost.asObservable();


  addPost(title: string, content: string, image: File): any {
    // const post = {title, content};
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);

    this.http.post('http://localhost:3000/api/posts', postData)
    .subscribe((dataa: any) => {
      this.posts.unshift(dataa.post);
      this.updatedPost.next(this.posts);
      this.router.navigate(['/']);
    });
  }
  getPosts(postsPerPage: number, currentPage: number): any {
    const queryParams = `?pageSize=${postsPerPage}&currentPage=${currentPage}`;
    this.http.get('http://localhost:3000/api/posts' + queryParams)
    .subscribe((dataa: any) => {
      this.posts = dataa.posts;
      this.updatedPost.next(dataa);
      console.log(dataa);
    });
  }

  getPost(postid): any {
    return this.http.get('http://localhost:3000/api/posts/' + postid);
  }

  deletePost(postid): any {
    return this.http.delete('http://localhost:3000/api/posts/' + postid);
  }

  updatePost(postid, title, content, image: File | string): any {
    // const newPost = {_id: postid, title, content};
    let newPostData;
    if (typeof(image) === 'object') {
      newPostData = new FormData();
      newPostData.append('postid', postid);
      newPostData.append('title', title);
      newPostData.append('content', content);
      newPostData.append('imagePath', image, title);
    } else {
      newPostData = {
        _id: postid,
        title,
        content,
        // tslint:disable-next-line:object-literal-shorthand
        imagePath: image
      };
    }
    return this.http.put('http://localhost:3000/api/posts/' + postid, newPostData);
  }


}
