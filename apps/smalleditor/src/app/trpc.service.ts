import { Injectable } from '@angular/core';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
// eslint-disable-next-line @nx/enforce-module-boundaries
import type { AppRouter } from '../../../api/src/main';
import type { UserOutput } from '@smallblog/interfaces';
import type { FolderApi, Pane } from 'tweakpane';
import { DebugService } from './debug.service';

@Injectable({
  providedIn: 'root',
})
export class TrpcService {
  client!: ReturnType<typeof createTRPCProxyClient<AppRouter>>;
  user?: UserOutput;

  users!: typeof this.client.users;
  posts!: typeof this.client.posts;
  auth!: typeof this.client.auth;

  constructor(private debugService: DebugService) {
    this.createClient();
    this.debbugger();
  }

  debbugger() {
    if (this.debugService.active) {
      const debug = this.debugService.createFolder('TRPC');
      if (!debug) {
        return;
      }
      const initBtn = debug.addButton({
        title: 'Init',
        label: 'Init',
      });
      initBtn.on('click', () => {
        this.client.auth.init.mutate();
      });

    }
  }

  createClient(token = '') {
    this.client = createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000',
          headers: {
            authorization: `Bearer ${token}`,
          },
        }),
      ],
    });
    this.users = this.client.users;
    this.posts = this.client.posts;
    this.auth = this.client.auth;
    // try {
    //   this.client.auth.init.mutate();
    // } catch (e) {
    //   console.warn(e);
    // }
  }

  async login(email: string, password: string) {
    const result = await this.auth.login.query({
      email,
      password,
    });
    this.user = result.user;
    this.createClient(result.token);
  }
}
