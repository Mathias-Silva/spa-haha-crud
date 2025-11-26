import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { MassagemService, Massagem } from '../../services/massagem.service';

@Component({
  selector: 'app-tipos-massagem',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './tipos-massagem.component.html',
  styleUrls: ['./tipos-massagem.component.css']
})
export class TiposMassagemComponent implements OnInit {
  massagens: Massagem[] = [];
  loading = true;
  selectedDate: string = '';
  selectedHorario: string = '';
  selectedMassagem: Massagem | null = null;

  horarios = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

  constructor(private massagemService: MassagemService) {}

  ngOnInit(): void {
    this.massagemService.getAll().subscribe({
      next: (data) => {
        this.massagens = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
    
    // Data mínima é hoje
    const hoje = new Date();
    hoje.setDate(hoje.getDate());
    this.selectedDate = hoje.toISOString().split('T')[0];
  }

  selectMassagem(massagem: Massagem): void {
    this.selectedMassagem = massagem;
  }

  getDaysInMonth(): Date[] {
    const hoje = new Date();
    const days: Date[] = [];
    const currentMonth = hoje.getMonth();
    const currentYear = hoje.getFullYear();
    
    // Primeiro dia do mês
    const firstDay = new Date(currentYear, currentMonth, 1);
    // Último dia do mês
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    
    for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
      if (d >= hoje) {
        days.push(new Date(d));
      }
    }
    
    return days;
  }

  isToday(date: Date): boolean {
    const hoje = new Date();
    return date.toDateString() === hoje.toDateString();
  }

  selectDate(date: Date): void {
    this.selectedDate = date.toISOString().split('T')[0];
  }

  getMonthName(): string {
    const hoje = new Date();
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                   'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return meses[hoje.getMonth()] + ' ' + hoje.getFullYear();
  }

  reservar(): void {
    if (this.selectedMassagem && this.selectedDate && this.selectedHorario) {
      // Redireciona para página de reserva com parâmetros
      window.location.href = `/reserva?massagem=${this.selectedMassagem._id}&data=${this.selectedDate}&horario=${this.selectedHorario}`;
    }
  }
}

