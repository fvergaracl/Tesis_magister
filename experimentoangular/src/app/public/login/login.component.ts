import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { RestapiconfService } from 'src/app/servicio/restapiconf.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(public http: HttpClient,
      public router: Router,
      public _RestapiconfService: RestapiconfService) {

    }
  
    gotermino(){
      this.router.navigate(['/terminos']);
    }

  entrar_sistema(usuario,contrasena){
    //-console.log(usuario)
    //-console.log(contrasena)

    const req = this.http.post(this._RestapiconfService.getUrlApi()+'login', {
      usuario: usuario,
      contrasena: contrasena
    })
      .subscribe(
        res => {
          if (res['code'] === 200) {
            
            localStorage.setItem('token', res['token'])
            
            localStorage.setItem('ultima_url', '/dashboard')
            this._RestapiconfService.reg_accion('login','')
            this.router.navigate(['/dashboard']);
          } else if (res['code'] >= 400) {
            Swal.fire({
              title: 'Error',
              text: res['message'],
              type: 'warning',
              showCancelButton: true,
              reverseButtons: true,
              confirmButtonText: 'OK',
              cancelButtonText: 'cerrar'
            })
          }
        },
        err => {
        }
      );
      
    if (usuario === ''){
      Swal.fire({
        title: 'Error',
        text: '------------',
        type: 'warning',
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'cerrar'
      })
    }
    else{
      
    }
    
  }

  ngOnInit() {
    let ultima_url = localStorage.getItem('ultima_url')
    if (localStorage.getItem('ultima_url') != null){
      this.router.navigate([ultima_url]);
    }
  }


}
