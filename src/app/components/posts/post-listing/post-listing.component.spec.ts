import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { PostListingComponent } from './post-listing.component';
import { PostService } from '../post.service';
import { Post } from '../post';
import { of, throwError } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

describe('PostListingComponent', () => {
  let component: PostListingComponent;
  let fixture: ComponentFixture<PostListingComponent>;
  let postService: jasmine.SpyObj<PostService>;

  beforeEach(() => {
    const postServiceSpy = jasmine.createSpyObj('PostService', ['getPosts']);

    TestBed.configureTestingModule({
      declarations: [PostListingComponent],
      providers: [{ provide: PostService, useValue: postServiceSpy }],
    });

    fixture = TestBed.createComponent(PostListingComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load posts on ngOnInit', fakeAsync(() => {
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

    const mockResponse = new HttpResponse({
      body: mockPosts,
      headers: new HttpHeaders({ 'X-WP-TotalPages': 3 })
    });

    postService.getPosts.and.returnValue(of(mockResponse));

    fixture.detectChanges();
    tick();

    expect(component.posts).toEqual(mockPosts);
    expect(component.totalPages).toBe(3);
  }));

  it('should handle error when loading posts on ngOnInit', fakeAsync(() => {
    const errorMessage = 'Simulated HTTP Error';

    postService.getPosts.and.returnValue(throwError(errorMessage));

    spyOn(console, 'error');

    fixture.detectChanges();
    tick();

    expect(console.error).toHaveBeenCalledWith('Request error:', errorMessage);
  }));

  it(`should load more posts when ${PostListingComponent.prototype.loadMorePosts} is called`, fakeAsync(() => {
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

    const mockResponse = new HttpResponse({
      body: mockPosts,
      headers: new HttpHeaders({ 'X-WP-TotalPages': 3 })
    });

    postService.getPosts.and.returnValue(of(mockResponse));

    component.loadMorePosts();
    tick();

    expect(component.posts).toEqual(mockPosts);
    expect(component.totalPages).toBe(3);
  }));

  it('should disable load more button when all pages are loaded', () => {
    component.currentPage = 3;
    component.totalPages = 3;

    const isDisabled = component.isLoadMoreDisabled();

    expect(isDisabled).toBe(true);
  });

  it('should enable load more button when there are more pages to load', () => {
    component.currentPage = 2;
    component.totalPages = 3;

    const isDisabled = component.isLoadMoreDisabled();

    expect(isDisabled).toBe(false);
  });
});
