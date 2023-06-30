import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
interface MyObject {
  id?: string;
  content: string;
  title: string;
}
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}
  createPosts(postData: MyObject) {
    return this.http
      .post<MyObject>(
        'https://ang-test-f2a5d-default-rtdb.firebaseio.com/posts.json',
        postData
      )

  }
  fetchPosts() {
    return this.http
      .get<{ [key: string]: MyObject }>(
        'https://ang-test-f2a5d-default-rtdb.firebaseio.com/posts.json'
      )
      .pipe(
        map((responseData) => {
          const postsArray: MyObject[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({
                ...responseData[key],
                id: key,
              });
            }
          }
          return postsArray;
        })
      );
  }
  clearPosts() {
    return this.http.delete(
      'https://ang-test-f2a5d-default-rtdb.firebaseio.com/posts.json'
    );
  }
}
