import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HeaderComponent, FooterComponent],
  template: './contato.component.html',
  styles: ['./contato.component.css']
})
export class ContatoComponent {
  contatoForm: FormGroup;
  enviado = false;
  erro = '';

  constructor(private fb: FormBuilder) {
    this.contatoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      assunto: ['', Validators.required],
      mensagem: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  enviar(): void {
    if (this.contatoForm.valid) {
      // Simulação de envio (você pode integrar com um serviço real depois)
      this.enviado = true;
      this.contatoForm.reset();
      setTimeout(() => {
        this.enviado = false;
      }, 5000);
    } else {
      this.contatoForm.markAllAsTouched();
    }
  }
}

