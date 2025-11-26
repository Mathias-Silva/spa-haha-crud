import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReservaService } from '../../services/reserva.service';
import { MassagemService, Massagem } from '../../services/massagem.service';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {
  form: FormGroup;
  massagens: Massagem[] = [];
  horarios = ['09:00','10:00','11:00','14:00','15:00','16:00'];
  sucesso = '';
  erro = '';

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService,
    private massagemService: MassagemService,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      massagem: ['', Validators.required],
      data: ['', Validators.required],
      horario: ['', Validators.required],
      observacoes: ['']
    });
  }

  ngOnInit(): void {
    this.massagemService.getAll().subscribe(data => {
      this.massagens = data;
      
      // Verifica se há parâmetros na URL
      this.route.queryParams.subscribe(params => {
        if (params['massagem']) {
          this.form.patchValue({ massagem: params['massagem'] });
        }
        if (params['data']) {
          this.form.patchValue({ data: params['data'] });
        }
        if (params['horario']) {
          this.form.patchValue({ horario: params['horario'] });
        }
      });
    });
  }

  carregando = false;

  getMinDate(): string {
    const hoje = new Date();
    return hoje.toISOString().split('T')[0];
  }

  reservar(): void {
    this.sucesso = '';
    this.erro = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.carregando = true;
    this.reservaService.criarReserva(this.form.value).subscribe({
      next: () => { 
        this.sucesso = 'Reserva realizada com sucesso!'; 
        this.form.reset();
        this.carregando = false;
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      },
      error: err => {
        this.erro = err.error?.message || 'Erro ao reservar.';
        this.carregando = false;
      }
    });
  }
}
