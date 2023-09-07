import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-listing',
  templateUrl: './post-listing.component.html',
  styleUrls: ['./post-listing.component.css']
})
export class PostListingComponent implements OnInit {
  posts: Post[] = [];
  currentPage = 1;
  totalPages = 1;

  constructor(private postService: PostService) {  }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPosts(this.currentPage).subscribe(
      (response) => {
        const posts: Post[] = response.body || [];

        const xWPTotalPages = response.headers.get('X-WP-TotalPages');
        this.totalPages = parseInt(xWPTotalPages || '1', 10);

        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }

        const validPosts: Post[] = posts.filter(post => {
          return (
            post.title.rendered &&
            post.excerpt.rendered &&
            post._embedded &&
            post._embedded['wp:featuredmedia']
          );
        });

        this.posts = this.posts.concat(validPosts);

      },
      (error) => {
        console.error('Request error:', error);
      }
    );
  }

  loadMorePosts() {
    this.loadPosts();
  }

  isLoadMoreDisabled(): boolean {
    return this.currentPage >= this.totalPages;
  }
}
