import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Massagem {
  _id?: string;
  nome: string;
  preco: number;
  descricao: string;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private api = 'http://localhost:3000'; // Ajuste conforme necessário

  constructor(private http: HttpClient) {}

  getMassagens(): Observable<Massagem[]> {
    return this.http.get<Massagem[]>(`${this.api}/admin/massagens`);
  }

  addMassagem(massagem: Massagem): Observable<Massagem> {
    return this.http.post<Massagem>(`${this.api}/admin/massagens`, massagem, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }

  updateMassagem(id: string, massagem: Massagem): Observable<Massagem> {
    return this.http.put<Massagem>(`${this.api}/admin/massagens/${id}`, massagem, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }

  deleteMassagem(id: string): Observable<any> {
    return this.http.delete(`${this.api}/admin/massagens/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }
}