import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'smalleditor-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {}
