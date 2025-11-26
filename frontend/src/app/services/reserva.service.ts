import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MassagemPopulada {
  _id: string;
  nome: string;
  preco: number;
  descricao: string;
}

export interface UserPopulado {
  _id: string;
  nome: string;
  email: string;
}

export interface Reserva {
  _id?: string;
  user?: string | UserPopulado;
  massagem: string | MassagemPopulada;
  data: string;
  horario: string;
  pago?: boolean;
  observacoes?: string;
}

@Injectable({ providedIn: 'root' })
export class ReservaService {
  private api = 'http://localhost:3000/reserva';

  constructor(private http: HttpClient) {}

  criarReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(`${this.api}/`, reserva, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }

  minhasReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.api}/minhas`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }

  listarTodas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.api}/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }

  atualizarPagamento(id: string, pago: boolean): Observable<Reserva> {
    return this.http.patch<Reserva>(`${this.api}/${id}/pagamento`, { pago }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }

  deletar(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }
}
