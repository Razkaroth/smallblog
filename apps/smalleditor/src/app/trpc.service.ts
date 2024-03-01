import { Injectable } from '@angular/core';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../api/src/main';
import type { UserOutput } from '@smallblog/interfaces';

@Injectable({
  providedIn: 'root',
})
export class TrpcService {
  client!: ReturnType<typeof createTRPCProxyClient<AppRouter>>;
  user?: UserOutput;

  users!: typeof this.client.users;
  posts!: typeof this.client.posts;
  auth!: typeof this.client.auth;

  constructor() {
    this.createClient();
  }

  createClient(token: string = '') {
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
