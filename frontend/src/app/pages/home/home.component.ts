import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MassagemListComponent } from './massagem-list/massagem-list.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { MassagemService, Massagem } from '../../services/massagem.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MassagemListComponent, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  massagens: Massagem[] = [];
  faqs = [
    {
      pergunta: 'Como faço para agendar uma massagem?',
      resposta: 'É muito simples! Basta criar uma conta, fazer login e escolher o tipo de massagem desejado. Depois, selecione a data e horário disponíveis.',
      open: false
    },
    {
      pergunta: 'Quais são os métodos de pagamento aceitos?',
      resposta: 'Aceitamos pagamento em dinheiro, cartão de débito, cartão de crédito e PIX. O pagamento pode ser feito no local ou antecipadamente.',
      open: false
    },
    {
      pergunta: 'Posso cancelar ou remarcar minha reserva?',
      resposta: 'Sim! Você pode cancelar ou remarcar sua reserva até 24 horas antes do horário agendado. Entre em contato conosco para fazer a alteração.',
      open: false
    },
    {
      pergunta: 'Quanto tempo dura uma sessão de massagem?',
      resposta: 'Nossas sessões têm duração de 60 minutos, incluindo o tempo de preparação e relaxamento pós-massagem.',
      open: false
    },
    {
      pergunta: 'Preciso levar algo para a sessão?',
      resposta: 'Não é necessário levar nada. Fornecemos toalhas, óleos e todo o material necessário. Apenas venha com roupas confortáveis.',
      open: false
    }
  ];

  constructor(private massagemService: MassagemService) {}

  ngOnInit(): void {
    this.massagemService.getAll().subscribe({
      next: (data) => this.massagens = data,
      error: () => console.error('Erro ao carregar massagens')
    });
  }

  toggleFaq(faq: any): void {
    faq.open = !faq.open;
  }
}
