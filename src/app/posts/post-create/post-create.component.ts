import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from './../posts.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(public PostsServicee: PostsService, public ActivatedRoutee: ActivatedRoute, public router: Router) { }
  mode;
  postid;
  isLoading = true;
  preview;
  form;

  onAddPost(postForm: NgForm): any {
    if (this.mode === 'edit') {
      this.PostsServicee.updatePost(this.postid, this.form.value.title, this.form.value.content, this.form.value.image)
      .subscribe((dataa) => {
        this.router.navigate(['/']);
      });
    } else {
      this.PostsServicee.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
    }
  }

  onImagePicked(e): any {
    const file = e.target.files[0];
    // if (file.name.endsWith('jpg')) {
    const reader = new FileReader();
    reader.onload = () => {
    this.preview = reader.result;
  };
    reader.readAsDataURL(file);
    this.form.patchValue({image: file});
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required]}),
      content: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, {validators: [Validators.required]})
    });
    this.ActivatedRoutee.paramMap.subscribe((dataa: any) => {
      if (dataa.has('postid')) {
        this.mode = 'edit';
        this.postid = dataa.params.postid;
        this.isLoading = true;
        this.PostsServicee.getPost(this.postid).subscribe((dataaa) => {
          this.isLoading = false;
          this.form.setValue({
            title: dataaa.singlePostt.title,
            content: dataaa.singlePostt.content,
            image: dataaa.singlePostt.imagePath
          });
          this.preview = dataaa.singlePostt.imagePath;
        });
      } else {
        this.mode = 'create';
        this.isLoading = false;
      }
    });
  }

}
