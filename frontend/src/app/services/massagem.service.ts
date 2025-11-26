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
export class MassagemService {
  private api = 'http://localhost:3000/admin/massagens';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Massagem[]> {
    return this.http.get<Massagem[]>(this.api);
  }

  getById(id: string): Observable<Massagem> {
    return this.http.get<Massagem>(`${this.api}/${id}`);
  }

  create(massagem: Massagem): Observable<Massagem> {
    return this.http.post<Massagem>(this.api, massagem, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }

  update(id: string, massagem: Massagem): Observable<Massagem> {
    return this.http.put<Massagem>(`${this.api}/${id}`, massagem, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }
}