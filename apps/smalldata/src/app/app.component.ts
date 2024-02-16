import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { TrpcService } from './trpc.service';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'smalldata-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'smalldata';
  constructor(private readonly trpc: TrpcService) {
    this.init();
  }

  async init() {
    this.title = await this.trpc.client.greeting.query();
  }
}
