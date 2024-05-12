import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTiptapNotionComponent } from '@ngx-tiptap-notion'
import * as Y from 'yjs';
@Component({
  selector: 'smalleditor-main',
  standalone: true,
  imports: [CommonModule, NgxTiptapNotionComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  ydoc = new Y.Doc();
}
