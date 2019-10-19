import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestapiconfService {

  tipousuario: string;
  token: string;
  logged: boolean;
  nickname: string;
  urlapi: string;
  expiretoken: string;

  constructor(public http: HttpClient) {
      this.token = localStorage.getItem('token')
      //-console.log(this.token)
      if (this.token != null) {
        let temproltoken = this.token.split('.')[1]
        this.nickname = JSON.parse(atob(temproltoken))['nickname']
        this.tipousuario = JSON.parse(atob(temproltoken))['tipousuario']
        this.expiretoken = JSON.parse(atob(temproltoken))['exp']
        this.logged = true
      }
      else {
        this.tipousuario = ''
        this.nickname = ''
        this.expiretoken = ''
        this.logged = false
      }
      
      this.urlapi = 'http://tera.uach.cl:8080/'
    }
  
    reg_fin_de_desafio(n_desafio){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'JWT ' + localStorage.getItem('token')
        })
      };
      let informacion = {
        ndesafio: n_desafio,
        usuario: JSON.parse(atob(localStorage.getItem('token').split('.')[1])).nickname
      }
      const req = this.http.post(this.getUrlApi() + 'fin_desafio', informacion, httpOptions )
      .subscribe(res => {
        if (res['code'] === 200){
          //-console.log('accion registrada , fin de desafio')
          
        } else {
          //-console.log(res)
          //-console.log('NO : --->accion registrada, fin de desafio')
     }
      });
    }

  reg_accion(tipo_,dato_){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      })
    };
    let informacion = {
      tipo: tipo_,
      dato: dato_,
      usuario: JSON.parse(atob(localStorage.getItem('token').split('.')[1])).nickname
    }
    const req = this.http.post(this.getUrlApi() + 'registrar_accion', informacion, httpOptions )
    .subscribe(res => {
      if (res['code'] === 200){
        //-console.log('accion registrada')
        
      } else {
        //-console.log(res)
        //-console.log('NO : --->accion registrada')
   }
    });
  }

  recomendacion(id_query,accion){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      })
    };
    let informacion = {
      idquery: id_query,
      accion: accion
    }
    const req = this.http.post(this.getUrlApi() + 'recomendar', informacion, httpOptions )
    .subscribe(res => {
      if (res['code'] === 200){
        //-console.log('RECOMENDAR <- OK')
        
      } else {
        //-console.log(res)
        //-console.log('***>RECOMENDAR <- OK')
   }
    });
  }
  

  setLogged(newStatus: boolean) {
    this.logged = newStatus;  
  }

  setToken(newToken: string) {
    this.token = newToken;  
  }

  setExpireToken(newexpToken: string) {
    this.expiretoken = newexpToken;  
  }

  setNickname(newNick: string) {
    this.nickname = newNick;  
  }

  setRol(tipousuario: string) {
    this.tipousuario = tipousuario;  
  }

  getLogged(): boolean {
    return this.logged;
  }

  getNick(): string {
    return this.nickname;
  }

  gettipousuario(): string {
    return this.tipousuario;
  }

  getUrlApi(): string {
    return this.urlapi;
  }

  getIsLoged(): boolean {
    return this.logged;
  }

  getToken(): string {
    return this.token;
  }

  getexpToken(): string {
    return this.expiretoken;
  }
}
