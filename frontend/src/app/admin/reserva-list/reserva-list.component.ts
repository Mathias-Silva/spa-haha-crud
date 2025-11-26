import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaService, Reserva, MassagemPopulada, UserPopulado } from '../../services/reserva.service';

@Component({
  selector: 'app-reserva-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reserva-list.component.html',
  styleUrls: ['./reserva-list.component.css']
})
export class ReservaListComponent implements OnInit {
  reservas: Reserva[] = [];

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar() {
    this.reservaService.listarTodas().subscribe(data => this.reservas = data);
  }

  excluir(id: string) {
    if (confirm('Deseja remover esta reserva?')) {
      this.reservaService.deletar(id).subscribe(() => this.carregar());
    }
  }

  getMassagemNome(massagem: string | MassagemPopulada | undefined): string {
    if (!massagem) return '-';
    return typeof massagem === 'string' ? '-' : massagem.nome;
  }

  getUserNome(user: string | UserPopulado | undefined): string {
    if (!user) return '-';
    return typeof user === 'string' ? '-' : user.nome;
  }

  getUserEmail(user: string | UserPopulado | undefined): string {
    if (!user) return '-';
    return typeof user === 'string' ? '-' : (user as UserPopulado).email || '-';
  }

  marcarComoPago(id: string): void {
    if (confirm('Marcar esta reserva como paga?')) {
      this.reservaService.atualizarPagamento(id, true).subscribe({
        next: () => {
          this.carregar();
        },
        error: (err) => {
          alert('Erro ao atualizar pagamento: ' + (err.error?.message || 'Erro desconhecido'));
        }
      });
    }
  }

  marcarComoNaoPago(id: string): void {
    if (confirm('Marcar esta reserva como não paga?')) {
      this.reservaService.atualizarPagamento(id, false).subscribe({
        next: () => {
          this.carregar();
        },
        error: (err) => {
          alert('Erro ao atualizar pagamento: ' + (err.error?.message || 'Erro desconhecido'));
        }
      });
    }
  }
}
