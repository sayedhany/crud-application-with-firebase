import { PostsService } from './posts.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface MyObject {
  id?: string;
  content: string;
  title: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts: MyObject[] = [];
  isFeatching = false;
  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.isFeatching = true;
    this.postsService.fetchPosts().subscribe((posts) => {
      this.loadedPosts = posts;
      this.isFeatching = false;
    });
  }

  onCreatePost(postData: MyObject) {
    // Send Http request
    // console.log(postData);
    this.isFeatching = true;
    this.postsService.createPosts(postData).subscribe((res) => {
      console.log(res, 'res');
      this.onFetchPosts();
      this.isFeatching = false;
    });
  }

  onFetchPosts() {
    // Send Http request
    this.isFeatching = true;
    this.postsService.fetchPosts().subscribe((posts) => {
      this.loadedPosts = posts;
      this.isFeatching = false;
    });
  }

  onClearPosts() {
    // Send Http request
    this.isFeatching = true;
    this.postsService.clearPosts().subscribe((data) => {
      this.isFeatching = false;
      console.log(data, 'deleted');
      // this.onFetchPosts();
      this.loadedPosts = [];
      // this.isFeatching = false;
    });
  }
}
