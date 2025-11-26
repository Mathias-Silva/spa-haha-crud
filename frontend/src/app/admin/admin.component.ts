import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MassagemListComponent } from './massagem-list/massagem-list.component';
import { ReservaListComponent } from './reserva-list/reserva-list.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, MassagemListComponent, ReservaListComponent, HeaderComponent, FooterComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
}

