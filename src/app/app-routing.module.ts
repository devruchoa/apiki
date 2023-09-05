import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListingComponent } from './components/posts/post-listing/post-listing.component';
import { PostComponent } from './components/posts/post/post.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'postListing',
    pathMatch: 'full'
  },
  {
    path: 'postListing',
    component: PostListingComponent
  },
  {
    path: 'post/:id',
    component: PostComponent
  },
  {
    path: '**',
    redirectTo: 'postListing'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
