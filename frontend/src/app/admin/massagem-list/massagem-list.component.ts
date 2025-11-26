import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MassagemService, Massagem } from '../../services/massagem.service';
import { MassagemFormComponent } from '../massagem-form/massagem-form.component';

@Component({
  selector: 'app-massagem-list',
  standalone: true,
  imports: [CommonModule, MassagemFormComponent],
  templateUrl: './massagem-list.component.html',
  styleUrls: ['./massagem-list.component.css']
})
export class MassagemListComponent implements OnInit {
  massagens: Massagem[] = [];
  editando?: Massagem;

  constructor(private massagemService: MassagemService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar() {
    this.massagemService.getAll().subscribe(data => this.massagens = data);
    this.editando = undefined;
  }

  editar(m: Massagem) {
    this.editando = { ...m };
  }

  excluir(id: string) {
    if (confirm('Deseja remover esta massagem?')) {
      this.massagemService.delete(id).subscribe(() => this.carregar());
    }
  }
}
