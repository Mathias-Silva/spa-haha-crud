import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  erro: string = '';
  carregando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.carregando = true;
      this.erro = '';
      
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.carregando = false;
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.carregando = false;
          this.erro = err.error?.message || 'Erro ao fazer login. Verifique suas credenciais.';
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  irParaCadastro(): void {
    this.router.navigate(['/cadastro']);
  }
}
