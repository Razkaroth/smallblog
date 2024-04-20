import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxTiptapNotionComponent } from './ngx-tiptap-notion.component';

describe('NgxTiptapNotionComponent', () => {
  let component: NgxTiptapNotionComponent;
  let fixture: ComponentFixture<NgxTiptapNotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxTiptapNotionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxTiptapNotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
