import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostService } from '../post.service';
import { Post, ProductObject } from '../post';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent implements OnInit {
  posts: Post[] = [];
  constructor(public postService: PostService) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.postService.getAll().subscribe((data: ProductObject) => {
      this.posts = data.products;
      console.log('Bruhhh');
      console.log(this.posts);
    });
  }
  deletePost(id: number) {
    this.postService
      .delete(id)
      .subscribe(
        (res) => (this.posts = this.posts.filter((items) => items.id !== id))
      );
  }
}
