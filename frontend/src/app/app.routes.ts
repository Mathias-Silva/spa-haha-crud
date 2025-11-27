import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { HomeComponent } from './pages/home/home.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { AdminComponent } from './admin/admin.component';
import { TiposMassagemComponent } from './pages/tipos-massagem/tipos-massagem.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { MinhasReservasComponent } from './pages/minhas-reservas/minhas-reservas.component';
import { AuthGuard } from './services/auth.guard';
import { AdminGuard } from './services/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'tipos-massagem', component: TiposMassagemComponent },
  { path: 'reserva', component: ReservaComponent, canActivate: [AuthGuard] },
  { path: 'minhas-reservas', component: MinhasReservasComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'sobre', component: SobreComponent },
  { path: 'quem-somos', component: SobreComponent },
  { path: 'contato', component: ContatoComponent },

  { path: '**', redirectTo: '' }
];
