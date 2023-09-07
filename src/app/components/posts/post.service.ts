import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(page: number) {
    return this.http.get<Post[]>(`https://blog.apiki.com/wp-json/wp/v2/posts?_embed&categories=518&page=${page}`, { observe: 'response'});
  }
}
