import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { PostService } from './post.service';
import { Post } from './post';
import { HttpResponse } from '@angular/common/http';

describe(PostService.name, () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService]
    });

    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should fetch posts via GET when ${PostService.prototype.getPosts} is called`, () => {
    const page = 1;
    const mockPosts: Post[] = [
      {
        id: 1,
        title: {
          rendered: 'Título do Post 1',
        },
        _embedded: {
          'wp:featuredmedia': [
            {
              source_url: 'https://exemplo.com/imagem1.jpg',
            },
          ],
        },
        link: 'https://exemplo.com/post1',
        excerpt: {
          rendered: 'exemplo texto'
        }
      },
      {
        id: 2,
        title: {
          rendered: 'Título do Post 2',
        },
        _embedded: {
          'wp:featuredmedia': [
            {
              source_url: 'https://exemplo.com/imagem2.jpg',
            },
          ],
        },
        link: 'https://exemplo.com/post2',
        excerpt: {
          rendered: 'exemplo texto'
        }
      },
      {
        id: 3,
        title: {
          rendered: 'Título do Post 3',
        },
        _embedded: {
          'wp:featuredmedia': [
            {
              source_url: 'https://exemplo.com/imagem3.jpg',
            },
          ],
        },
        link: 'https://exemplo.com/post3',
        excerpt: {
          rendered: 'exemplo texto'
        }
      }
    ]

    service.getPosts(page).subscribe((response: HttpResponse<Post[]>) => {
      const posts = response.body || [];
      expect(posts.length).toBe(3);
      expect(posts).toEqual(mockPosts);
    });

    const req = httpMock.expectOne(`https://blog.apiki.com/wp-json/wp/v2/posts?_embed&categories=518&page=${page}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockPosts);
  });

  it(`should handle error when ${PostService.prototype.getPosts} encounters an HTTP error`, () => {
    const page = 1;
    const errorMessage = 'Simulated HTTP Error';

    service.getPosts(page).subscribe(
      () => {
        fail('Expect an error to be thrown');
    },
      (error) => {
        expect(error).toBeTruthy();
        expect(error.status).toBe(500);
        expect(error.statusText).toBe(errorMessage);
    });

    const req = httpMock.expectOne(`https://blog.apiki.com/wp-json/wp/v2/posts?_embed&categories=518&page=${page}`);
    expect(req.request.method).toBe('GET');

    req.flush([], { status: 500, statusText: errorMessage });
  });
});
