import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { RestapiconfService } from 'src/app/servicio/restapiconf.service';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss']
})
export class IframeComponent implements OnInit {
  _url:any;
  _url_:any;
  veces_revisado:any;
  mostrar: boolean;
  
  constructor(private route: ActivatedRoute, 
    public sanitizer: DomSanitizer,
    public http: HttpClient, public _RestapiconfService: RestapiconfService) { }

  ngOnInit() {
    this.veces_revisado = 0;
    this.mostrar = false;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      })
    };
    this.http.get( this._RestapiconfService.getUrlApi() + 'getrecurso/' + decodeURIComponent(this.route.snapshot.paramMap.get("url")) , httpOptions).subscribe(data => {
      if (data['code'] === 200) {
        this.mostrar = true;
        this._url =  data['url']
    } else {
      //-console.log(data['code']);

    }
    });
    
  }
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    this._RestapiconfService.reg_accion('cerrar_pagina',decodeURIComponent(this.route.snapshot.paramMap.get("url")))
  }
  @HostListener('window:focus', ['$event'])
   onFocus(event: FocusEvent): void {
      this.veces_revisado = this.veces_revisado + 1;

   }

   @HostListener('window:blur', ['$event'])
   onBlur(event: FocusEvent): void {
    //-console.log('Saliste')   
   }
   
}
