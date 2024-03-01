import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import type { AuthInput } from '@smallblog/interfaces';
import { TrpcService } from '../../trpc.service';
import { Router } from '@angular/router';

@Component({
  selector: 'smalleditor-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authInput: AuthInput = {
    email: '',
    password: '',
  };

  error?: string;

  constructor(private trpc: TrpcService, private router: Router) {}

  async login() {
    try {
      await this.trpc.login(this.authInput.email, this.authInput.password);
      // check if user
      if (this.trpc.user?.isAdmin) {
        // redirect to home
        this.router.navigate(['']);
      } else {
        throw new Error('User is not an admin');
      }
    } catch (error: any) {
      this.error = error.message;
    }
  }
}
