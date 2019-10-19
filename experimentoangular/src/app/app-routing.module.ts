import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './public/login/login.component';
import { DashboardComponent } from './private/dashboard/dashboard.component';
import { DesafioComponent } from './private/desafio/desafio.component';
import { PretestComponent } from './private/desafio/pretest/pretest.component';
import { TestComponent } from './private/desafio/test/test.component';
import { PosttestComponent } from './private/desafio/posttest/posttest.component';
import { NoencontradoComponent } from './public/noencontrado/noencontrado.component';
import { IframeComponent } from './private/desafio/iframe/iframe.component';
import { TerminosComponent } from './public/terminos/terminos.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'terminos', component: TerminosComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'desafio/:id', component: DesafioComponent},
  {path: 'desafio/:id/pretest', component: PretestComponent},
  {path: 'desafio/:id/test', component: TestComponent},
  {path: 'desafio/:id/posttest', component: PosttestComponent},
  {path: 'recurso/:url', component: IframeComponent},
  { path: '**', component: NoencontradoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
