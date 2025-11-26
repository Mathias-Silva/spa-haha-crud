import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  cadastroForm: FormGroup;
  erro: string = '';
  sucesso: string = '';
  carregando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmaSenha: ['', Validators.required],
      endereco: [''],
      numero: [''],
      complemento: [''],
      termos: [false, Validators.requiredTrue]
    }, { validators: this.senhasIguais });
  }

  senhasIguais(control: AbstractControl): ValidationErrors | null {
    const senha = control.get('senha');
    const confirmaSenha = control.get('confirmaSenha');
    
    if (senha && confirmaSenha && senha.value !== confirmaSenha.value) {
      return { senhasDiferentes: true };
    }
    return null;
  }

  onCadastro(): void {
    if (this.cadastroForm.valid) {
      this.carregando = true;
      this.erro = '';
      this.sucesso = '';

      const { confirmaSenha, termos, ...dadosCadastro } = this.cadastroForm.value;
      // Remove campos vazios de endereço
      if (!dadosCadastro.endereco) delete dadosCadastro.endereco;
      if (!dadosCadastro.numero) delete dadosCadastro.numero;
      if (!dadosCadastro.complemento) delete dadosCadastro.complemento;

      this.authService.register(dadosCadastro).subscribe({
        next: () => {
          this.carregando = false;
          this.sucesso = 'Cadastro realizado com sucesso! Redirecionando...';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          this.carregando = false;
          this.erro = err.error?.message || 'Erro ao realizar cadastro. Tente novamente.';
        }
      });
    } else {
      this.cadastroForm.markAllAsTouched();
    }
  }
}
