import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Post, ProductObject } from '../post';
import { PostService } from '../post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export class ViewComponent implements OnInit {
  postId: string | null = null;
  postIdNum?: number;
  post?: Post;
  discountedPrice?: number;
  similarProduct: Post[] = [];
  constructor(private route: ActivatedRoute, public postService: PostService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.postId = params.get('postId');
      this.postIdNum = parseInt(this.postId!);
      this.getProduct(this.postIdNum);
    });
  }

  getProduct(id: number) {
    this.postService.getAll().subscribe((data: ProductObject) => {
      const product = data.products.find((product) => product.id === id);
      if (product) {
        this.post = product;
      }
      console.log(this.post);
      this.discountedPrice = parseFloat(
        (
          this.post?.price! -
          (this.post?.discountPercentage! / 100) * this.post?.price!
        ).toFixed(2)
      );
      this.getSimilarProduct(this.post?.category!);
    });
  }

  getSimilarProduct(cat_id: string) {
    this.postService.getAll().subscribe((data: ProductObject) => {
      const product: Post[] = data.products.filter(
        (product) => product.category === cat_id
      );
      if (product) {
        this.similarProduct = product;
      }

      console.log('Similar Products');
      console.log(this.similarProduct);
    });
  }
  
}
