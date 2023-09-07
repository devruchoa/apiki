export interface Post {
  id: number;
  title: {
    rendered: string;
  };
  _embedded: {
    'wp:featuredmedia': [
      {
        source_url: string;
      }
    ];
  };
  link: string;
  excerpt: {
    rendered: string;
  };
}
