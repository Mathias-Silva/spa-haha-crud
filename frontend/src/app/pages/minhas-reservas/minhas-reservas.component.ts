import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ReservaService, Reserva, MassagemPopulada } from '../../services/reserva.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-minhas-reservas',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './minhas-reservas.component.html',
  styleUrls: ['./minhas-reservas.component.css']
})
export class MinhasReservasComponent implements OnInit {
  reservas: Reserva[] = [];
  loading = true;
  filtro: 'todas' | 'pendentes' | 'pagas' | 'passadas' = 'todas';

  constructor(
    private reservaService: ReservaService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.carregarReservas();
  }

  carregarReservas(): void {
    this.loading = true;
    this.reservaService.minhasReservas().subscribe({
      next: (data) => {
        this.reservas = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  getMassagemNome(massagem: string | MassagemPopulada | undefined): string {
    if (!massagem) return '-';
    return typeof massagem === 'string' ? '-' : massagem.nome;
  }

  getMassagemPreco(massagem: string | MassagemPopulada | undefined): number {
    if (!massagem || typeof massagem === 'string') return 0;
    return massagem.preco;
  }

  getMassagemDescricao(massagem: string | MassagemPopulada | undefined): string {
    if (!massagem || typeof massagem === 'string') return 'Massagem relaxante';
    return massagem.descricao || 'Massagem relaxante';
  }

  isPassada(data: string): boolean {
    const dataReserva = new Date(data);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    return dataReserva < hoje;
  }

  getReservasFiltradas(): Reserva[] {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    switch (this.filtro) {
      case 'pendentes':
        return this.reservas.filter(r => !r.pago && !this.isPassada(r.data));
      case 'pagas':
        return this.reservas.filter(r => r.pago);
      case 'passadas':
        return this.reservas.filter(r => this.isPassada(r.data));
      default:
        return this.reservas;
    }
  }

  getTotalReservas(): number {
    return this.reservas.length;
  }

  getReservasPendentes(): number {
    return this.reservas.filter(r => !r.pago && !this.isPassada(r.data)).length;
  }

  getReservasPagas(): number {
    return this.reservas.filter(r => r.pago).length;
  }
}

