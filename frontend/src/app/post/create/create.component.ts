import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { Post } from '../post';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  form!: FormGroup;

  post?: Post[];
  constructor(public postService: PostService, private router: Router) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      discountPercentage: new FormControl('', Validators.required),
      brand: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      stock: new FormControl('', Validators.required),
      rating: new FormControl('', Validators.required),
    });
  }
  get f() {
    return this.form.controls;
  }
  submit() {
    console.log(this.form.value);
    this.postService.create(this.form.value).subscribe((createdPost: Post) => {
      this.postService.getAll().subscribe((posts: Post[]) => {
        this.post = posts;
        console.log(this.post);
      });
      alert('Post Created Successful!');
      this.router.navigateByUrl('post/index');
    });
  }

  navigateToIndex() {
    this.router.navigate(['/post/index']);
  }
}
