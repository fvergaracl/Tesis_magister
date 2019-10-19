import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { JoyrideModule} from 'ngx-joyride';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './public/login/login.component';
import { DashboardComponent } from './private/dashboard/dashboard.component';
import { DesafioComponent } from './private/desafio/desafio.component';
import { PretestComponent } from './private/desafio/pretest/pretest.component';
import { TestComponent } from './private/desafio/test/test.component';
import { PosttestComponent } from './private/desafio/posttest/posttest.component';
import { NoencontradoComponent } from './public/noencontrado/noencontrado.component';
import { IframeComponent } from './private/desafio/iframe/iframe.component';
import { VentanaDirective } from './directiva/ventana.directive';
import { TerminosComponent } from './public/terminos/terminos.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DesafioComponent,
    PretestComponent,
    TestComponent,
    PosttestComponent,
    NoencontradoComponent,
    IframeComponent,
    VentanaDirective,
    TerminosComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    JoyrideModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
