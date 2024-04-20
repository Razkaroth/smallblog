import { Injectable } from "@angular/core";
import { FolderApi, Pane } from "tweakpane";

@Injectable({
  providedIn: 'root'
})
export class DebugService {
  active = true;
  pane!: Pane;

  folders: { [key: string]: FolderApi } = {};

  constructor() {
    console.log('DebugService created');
    this.init();
  }

  init() {
    if (!this.active) {
      return;
    }
    console.log('DebugService init');
    this.pane = new Pane({
      title: 'Debug',
      expanded: true,
    });
  }
  createFolder(name: string, expanded = false) {
    if (!this.active) {
      return;
    }
    this.folders[name] = this.pane.addFolder({
      title: name,
      expanded: expanded,
    });
    return this.folders[name];
  }
  getFolder(name: string) {
    if (!this.active) {
      return;
    }
    return this.folders[name];
  }
}

