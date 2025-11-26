import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MassagemService, Massagem } from '../../../services/massagem.service';

@Component({
  selector: 'app-massagem-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './massagem-list.component.html',
  styleUrls: ['./massagem-list.component.css']
})
export class MassagemListComponent implements OnInit {
  massagens: Massagem[] = [];
  loading = true;

  constructor(private massagemService: MassagemService) {}

  ngOnInit(): void {
    this.massagemService.getAll().subscribe({
      next: (data) => { this.massagens = data; this.loading = false; },
      error: () => this.loading = false
    });
  }
}
