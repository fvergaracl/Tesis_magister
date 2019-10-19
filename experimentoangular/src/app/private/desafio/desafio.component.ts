import { Component, OnInit , HostListener} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RestapiconfService } from 'src/app/servicio/restapiconf.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-desafio',
  templateUrl: './desafio.component.html',
  styleUrls: ['./desafio.component.scss']
})
export class DesafioComponent implements OnInit {

  n_desafio:any;
  estado_desafio:any;
  data_desafio:any;

  boolean_desafio:boolean;
  boolean_pretest:boolean;
  boolean_resultados:boolean;
  boolean_posttest:boolean;

  constructor(private route: ActivatedRoute,public http: HttpClient, public _RestapiconfService: RestapiconfService,public router: Router) {
    this.data_desafio = {"detalle": ""}

    this.boolean_desafio = false;
    this.boolean_pretest = false;
    this.boolean_resultados = false;
    this.boolean_posttest = false;
  }

  procesar_evento_test_resultados(bla){}

  go_to_pretest(){
    this._RestapiconfService.reg_accion('click_iniciar_desafio',JSON.stringify({id_desafio:parseInt(this.n_desafio)}))
    Swal.fire({
      title: '¿Deseas iniciar este desafío?',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      reverseButtons: true,
      confirmButtonText: 'Si, Vamos',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value){
        this._RestapiconfService.reg_accion('click_iniciar_desafio_confirmado',JSON.stringify({id_desafio:parseInt(this.n_desafio)}))
        this.boolean_desafio = false;
        this.boolean_pretest = true;
        this.boolean_resultados = false;
        this.boolean_posttest = false;
        localStorage.setItem('visibilidad_desafio', [this.boolean_desafio,this.boolean_pretest,this.boolean_resultados,this.boolean_posttest].join())
      } else {
        this._RestapiconfService.reg_accion('click_iniciar_desafio_cancelado',JSON.stringify({id_desafio:parseInt(this.n_desafio)}))

      }
      
    })
  }

  fin_desafio(){
    this._RestapiconfService.reg_accion('click_finalizar_desafio',JSON.stringify({id_desafio:parseInt(this.n_desafio)}))
    Swal.fire({
      title: '¿Deseas finalizar este desafío?',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      reverseButtons: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value){
        this._RestapiconfService.reg_accion('click_finalizar_desafio_confirmado',JSON.stringify({id_desafio:parseInt(this.n_desafio)}))
        this.boolean_desafio = false;
        this.boolean_pretest = false;
        this.boolean_resultados = false;
        this.boolean_posttest = true;
        localStorage.setItem('visibilidad_desafio', [this.boolean_desafio,this.boolean_pretest,this.boolean_resultados,this.boolean_posttest].join())
      } else {
        this._RestapiconfService.reg_accion('click_finalizar_desafio_cancelado',JSON.stringify({id_desafio:parseInt(this.n_desafio)}))

      }
      
    })
  }

  procesar_pretest(respuesta:any){
    this._RestapiconfService.reg_accion('click_enviar_pretest',JSON.stringify({id_desafio:parseInt(this.n_desafio),dato:{id_pretest:parseInt(respuesta[0]),respuesta:respuesta[1],tipo:respuesta[2]}}))
    Swal.fire({
      title: '¿Deseas enviar respuesta?',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      reverseButtons: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value){
        this._RestapiconfService.reg_accion('click_enviar_pretest_confirmado','')
        this.boolean_desafio = false;
        this.boolean_pretest = false;
        this.boolean_resultados = true;
        this.boolean_posttest = false;
        localStorage.setItem('visibilidad_desafio', [this.boolean_desafio,this.boolean_pretest,this.boolean_resultados,this.boolean_posttest].join())
        //-console.log(respuesta)
        //-console.log('enviar log')
      } else {
        this._RestapiconfService.reg_accion('click_enviar_pretest_cancelado','')
      }
      
    })
  }
  procesar_posttest(respuesta:any){
    this._RestapiconfService.reg_accion('click_enviar_posttest',JSON.stringify({id_desafio:parseInt(this.n_desafio),dato:{id_pretest:parseInt(respuesta[0]),respuesta:respuesta[1],tipo:respuesta[2]}}))
    Swal.fire({
      title: '¿Deseas enviar respuesta?',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      reverseButtons: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value){
        this._RestapiconfService.reg_accion('click_enviar_posttest_confirmado','')
        this._RestapiconfService.reg_fin_de_desafio(this.n_desafio)
        this.boolean_desafio = false;
        this.boolean_pretest = false;
        this.boolean_resultados = false;
        this.boolean_posttest = false;
        localStorage.removeItem('visibilidad_desafio')

        localStorage.setItem('ultima_url', '/dashboard')
        this.router.navigate(['/dashboard']);
      } else {
        this._RestapiconfService.reg_accion('click_enviar_posttest_cancelado','')
      }
      
    })

  }

  procesar_evento_test_sin_modal(evento){
    let dato_enviar = { id_desafio:parseInt(this.n_desafio),data:evento.dato}
    //-console.log(evento)
    //-console.log(dato_enviar)
    this._RestapiconfService.reg_accion(evento.tipo,JSON.stringify(dato_enviar))
  }

  @HostListener('window:beforeunload', ['$event'])
  public doSomething($event) {
    return false;
  }
 

  ngOnInit() {
    this.n_desafio = this.route.snapshot.paramMap.get("id")
    let ultima_url = localStorage.getItem('ultima_url')
    if (localStorage.getItem('ultima_url') === null){
      this.router.navigate(['/']);
    }
    if (ultima_url.includes('/desafio/')){
      //-console.log('aca')
      let temp = ultima_url.split('desafio/')
      //-console.log(temp[1])
      if (temp[1] != this.n_desafio ){
        this.router.navigate([ultima_url]);
      }
    }
    
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      })
    };
    this.http.get( this._RestapiconfService.getUrlApi() + 'getdesafio/' + this.n_desafio , httpOptions).subscribe(data => {
      if (data['code'] === 200) {
        this.data_desafio = data
    } else {
      //-console.log(data['code']);

    }
    });
    try{
      let array_boolean = localStorage.getItem('visibilidad_desafio').split(',')
      if (array_boolean.length >=3){
        this.boolean_desafio = JSON.parse(array_boolean[0]);
        this.boolean_pretest = JSON.parse(array_boolean[1]);
        this.boolean_resultados = JSON.parse(array_boolean[2]);
        this.boolean_posttest = JSON.parse(array_boolean[3]);
      }
    } catch{
      this.boolean_desafio = true;
      this.boolean_pretest = false;
      this.boolean_resultados = false;
      this.boolean_posttest = false;
    }
    

  }
  
}
