import { Injectable } from '@angular/core';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
// eslint-disable-next-line @nx/enforce-module-boundaries
import type { AppRouter } from '../../../api/src/main';
import type { UserOutput } from '@smallblog/interfaces';
import type { FolderApi } from 'tweakpane';
import { DebugService } from './debug.service';

@Injectable({
  providedIn: 'root',
})
export class TrpcService {
  client!: ReturnType<typeof createTRPCProxyClient<AppRouter>>;
  user?: UserOutput;
  debug?: FolderApi;

  users!: typeof this.client.users;
  posts!: typeof this.client.posts;
  auth!: typeof this.client.auth;

  constructor(private debugService: DebugService) {
    this.createClient();
    this.debug = this.debugService.createFolder('TRPC');

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
  }

  async login(email: string, password: string) {
    console.log('login', email);
    const result = await this.auth.login.query({
      email,
      password,
    });
    this.user = result.user;
    this.createClient(result.token);
  }
}
