import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor/editor.component';

@Component({
  selector: 'smalleditor-main',
  standalone: true,
  imports: [CommonModule, EditorComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
}
