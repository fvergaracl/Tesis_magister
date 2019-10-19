import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RestapiconfService } from 'src/app/servicio/restapiconf.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  desafios:any;
  constructor(public http: HttpClient, public _RestapiconfService: RestapiconfService, public router: Router) {
    this.desafios =[]
  }
  salir(){
    this._RestapiconfService.reg_accion('click_salir','');
    localStorage.removeItem('token');
    localStorage.removeItem('tour');
    localStorage.removeItem('ultima_url');
    this.router.navigate(['/']);
  }

 

  entrar_a_desafio(id_desafio,titulo_desafio){
    //-console.log(id_desafio)
    this._RestapiconfService.reg_accion('click_entrar',JSON.stringify({id_desafio:id_desafio}))
    Swal.fire({
      title: 'Iniciar desafío',
      html: "¿Deseas iniciar el desafío: <b>" + titulo_desafio + "</b> ?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      reverseButtons: true,
      confirmButtonText: 'Si, Vamos',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this._RestapiconfService.reg_accion('click_entrar_confirmado',JSON.stringify({id_desafio:id_desafio}))
        localStorage.setItem('ultima_url', '/desafio/'+ id_desafio)
        this.router.navigate(['/desafio/'+ id_desafio]);
      } else{
        this._RestapiconfService.reg_accion('click_entrar_cancelado',JSON.stringify({id_desafio:id_desafio}))
      }
    })
  }

  ngOnInit() {
    //-console.log('dasssshhh')
    let ultima_url = localStorage.getItem('ultima_url')
    if (localStorage.getItem('ultima_url') === null){
      this.router.navigate(['/']);
    }
    if (localStorage.getItem('ultima_url') != null && localStorage.getItem('ultima_url') !="/dashboard"){
      this.router.navigate([ultima_url]);
    }
    else{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'JWT ' + localStorage.getItem('token')
        })
      };
      this.http.get( this._RestapiconfService.getUrlApi() + 'GetAllChallenges' , httpOptions).subscribe(data => {
        if (data['code'] === 200) {
          this.desafios = []
          //-console.log(this.desafios )
          for (let i = 0; i < data['allchallenges'].length; i++) {
            this.desafios.push(
              {
                id:data['allchallenges'][i][0],
                titulo: data['allchallenges'][i][1],
                imagen: this._RestapiconfService.getUrlApi() +'static/'+data['allchallenges'][i][0]+'.jpg',
                objetivos: data['allchallenges'][i][2],
                descripcion: data['allchallenges'][i][3],
                estado: data['allchallenges'][i][4]
              }
            )
            
          }
          //-console.log(this.desafios )
      } else {
        //-console.log(data['code']);

      }
      });
    }
  }

}
