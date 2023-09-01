import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RecoverAccountComponent } from './components/recover-account/recover-account.component';
import { EventPageDetailsComponent } from './components/event-page-details/event-page-details.component';
import { AuthGuard } from './components/guards/auth.guard';
import { ResetPasswordComponent } from './shared/components/reset-password/reset-password/reset-password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'home-page', component: HomePageComponent },
  { path: 'recover-account', component: RecoverAccountComponent },
  { path: 'event-details/:idEvent', component: EventPageDetailsComponent },
  { path: 'reset', component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
