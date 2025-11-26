import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MassagemService, Massagem } from '../../services/massagem.service';

@Component({
  selector: 'app-massagem-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './massagem-form.component.html',
  styleUrls: ['./massagem-form.component.css']
})
export class MassagemFormComponent implements OnChanges {
  @Input() massagem?: Massagem;
  @Output() saved = new EventEmitter<void>();
  form: FormGroup;
  erro = '';

  constructor(private fb: FormBuilder, private massagemService: MassagemService) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnChanges(): void {
    if (this.massagem) {
      this.form.patchValue(this.massagem);
    } else {
      this.form.reset();
    }
  }

  salvar(): void {
    this.erro = '';
    if (this.form.invalid) return;
    const req = this.massagem && this.massagem._id
      ? this.massagemService.update(this.massagem._id, this.form.value)
      : this.massagemService.create(this.form.value);

    req.subscribe({
      next: () => {
        this.form.reset();
        this.saved.emit();
      },
      error: err => this.erro = err.error?.message || 'Erro ao salvar.'
    });
  }
}
