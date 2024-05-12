import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Doc } from 'yjs';

@Component({
  selector: 'ngx-tiptap-notion-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ngx-tiptap-notion.component.html',
  styleUrl: './ngx-tiptap-notion.component.css',
})
export class NgxTiptapNotionComponent {
  @Input() ydoc?: Doc;




}
