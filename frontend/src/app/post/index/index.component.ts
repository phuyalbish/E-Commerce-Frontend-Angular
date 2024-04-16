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
  currentPage: any;
  totalPages: any;
  limit: number = 30;
  pageNumbers: any;
  constructor(public postService: PostService) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.postService.getAll().subscribe((data: ProductObject) => {
      this.posts = data.products;
      this.totalPages = data.total;
      this.pageNumbers = Math.ceil(data.total / data.limit);
      this.currentPage = 1;
    });
  }

  onPageChange(page: number) {
    let skip = (page - 1) * this.limit;
    this.currentPage = page;
    this.postService.getAll(skip).subscribe((data: ProductObject) => {
      this.posts = data.products;
      this.pageNumbers = 4;
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
