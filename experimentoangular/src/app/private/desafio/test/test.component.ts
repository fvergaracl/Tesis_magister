import { Component, OnInit ,Input, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';
import { RestapiconfService } from 'src/app/servicio/restapiconf.service';
import { JoyrideService } from 'ngx-joyride';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  @Output() evento_test = new EventEmitter<any>();
  @Output() evento_test_sin_modal = new EventEmitter<any>();
  @Output() fin_desafio_ = new EventEmitter<any>();
  toursnippet: boolean;
  array_pagina: any;
  public datatest: any;

    @Input() set set_datatest(value: any) {
       this.datatest = value;
    }

    get get_datatest(): any {
        return this.datatest;
    }
  

  @Input() detalledesafio: any;
  p: number = 1;
  isCollapsed:any;
  url_plataforma:any;
  constructor( public _RestapiconfService: RestapiconfService,public router: Router, private readonly joyrideService: JoyrideService, public toastr: ToastrService) {
    this.url_plataforma = 'http://tera.uach.cl/gonsa2_popularidad/recurso/'
    this.toursnippet = true
    this.array_pagina = [1]
   }

  cambiapag(event){
    console.log(this.array_pagina)
    console.log(this.array_pagina.length)
    this.toursnippet = false;
    if (event === this.p + 1 || event === this.p - 1){
      this.p = event
      if (!(event in this.array_pagina )){
        this.array_pagina.push(event)
      }
      this.evento_test_sin_modal.next({tipo:'click_pagina',dato:{pagina:this.p}})
    }
    
  }
  evento_SERP_VER(lugar:any, dato:String, url_interna:any){
    this.toursnippet = false;
    let _url = ''
    for (let i = 0; i < this.datatest.length; i++) {
      if (this.datatest[i].id_resultado === dato){
        _url = this.datatest[i].url
      }
      
    }
    if (lugar ==='titulo'){
      //-console.log('abrir pagina -> titulo')
      this.evento_test_sin_modal.next({tipo:'click_SERP_titulo',dato:{url:_url,id_SERP:dato}})
      window.open((this.url_plataforma+ url_interna), "_blank");
      //this.router.navigate(['recurso', {url: _url}]);
    } else if (lugar ==='url'){
      this.evento_test_sin_modal.next({tipo:'click_SERP_url',dato:{url:_url,id_SERP:dato}})
      //-console.log('abrir pagina -> url')
      window.open((this.url_plataforma+ url_interna), "_blank");
    } else if (lugar ==='boton_ver'){
      this.evento_test_sin_modal.next({tipo:'click_SERP_ver',dato:{url:_url,id_SERP:dato}})
      window.open((this.url_plataforma+ url_interna), "_blank");
      //-console.log('abrir pagina -> boton ver')
      
    }
  }

  evento_SERP(lugar:any, dato:String){
    this.toursnippet = false;
    let _url = ''
    for (let i = 0; i < this.datatest.length; i++) {
      if (this.datatest[i].id_resultado === dato){
        _url = this.datatest[i].url
      }
      
    }
    if (lugar ==='titulo'){
      //-console.log('abrir pagina -> titulo')
      this.evento_test_sin_modal.next({tipo:'click_SERP_titulo',dato:{url:_url,id_SERP:dato}})
      window.open((this.url_plataforma+ encodeURIComponent(_url)), "_blank");
      //this.router.navigate(['recurso', {url: _url}]);
    } else if (lugar ==='url'){
      this.evento_test_sin_modal.next({tipo:'click_SERP_url',dato:{url:_url,id_SERP:dato}})
      //-console.log('abrir pagina -> url')
      window.open((this.url_plataforma+ encodeURIComponent(_url)), "_blank");
    } else if (lugar ==='snippet'){
      //-console.log('registrar -> snippet')
    } else if (lugar ==='boton_ver'){
      this.evento_test_sin_modal.next({tipo:'click_SERP_ver',dato:{url:_url,id_SERP:dato}})
      window.open((this.url_plataforma+ encodeURIComponent(_url)), "_blank");
      //-console.log('abrir pagina -> boton ver')
      
    } else if (lugar ==='boton_guardar'){
      //-console.log(dato)
      let guardar_boton = (<HTMLInputElement>document.getElementById('guardar_'+dato)).className;
      let guardar_texto = (<HTMLInputElement>document.getElementById('guardar_texto_'+dato)).textContent;
      //-console.log(guardar_texto)
      if (guardar_boton ==='btn btn-primary btn-sm'){
        this.evento_test_sin_modal.next({tipo:'click_guardar',dato:{texto:'guardado',id_SERP:dato}})
        document.getElementById('guardar_'+dato).className = 'btn btn-success btn-sm'
        document.getElementById('guardar_texto_'+dato).textContent = ' Guardado'
        let registroSERP = JSON.parse(localStorage.getItem('registroSERP'))
        if (registroSERP === null){
          //-console.log('********11111*********')
          let ingresar = [['guardar',dato]]
          localStorage.setItem('registroSERP', JSON.stringify(ingresar))
        } else{
          //-console.log('*****************')
          let esta = false;
          for (let i = 0; i < registroSERP.length; i++) {
            if (registroSERP[i][0] ==='guardar'){
              if (registroSERP[i][1] === dato){
                esta = true;
                registroSERP = registroSERP.splice(i,1);
                break;
              }
            }
          }
          if (!esta){
            registroSERP.push(['guardar',dato])
          }
          localStorage.setItem('registroSERP', JSON.stringify(registroSERP)) 
        }
      } else {
        let registroSERP = JSON.parse(localStorage.getItem('registroSERP'))
        for (let i = 0; i < registroSERP.length; i++) {
          if (registroSERP[i][0] ==='guardar'){
            if (registroSERP[i][1] === dato){
              registroSERP.splice(i,1);
              break;

            }
          }
          
        }
        localStorage.setItem('registroSERP', JSON.stringify(registroSERP)) 
        this.evento_test_sin_modal.next({tipo:'click_guardar',dato:{texto:'NO_guardado',id_SERP:dato}})
        document.getElementById('guardar_'+dato).className = 'btn btn-primary btn-sm'
        document.getElementById('guardar_texto_'+dato).textContent = ' Guardar'
      }
    } else if (lugar ==='boton_recomendar'){
      let recomendar_boton = (<HTMLInputElement>document.getElementById('recomendar_'+dato)).className;
      let recomendar_texto = (<HTMLInputElement>document.getElementById('recomendar_texto_'+dato)).textContent;
      if (recomendar_boton ==='btn btn-primary btn-sm'){
        this.evento_test_sin_modal.next({tipo:'click_recomendar',dato:{texto:'recomendado',id_SERP:dato}})
        document.getElementById('recomendar_'+dato).className = 'btn btn-warning btn-sm'
        let n_reco = parseInt(document.getElementById('c_recomendado_'+dato).firstChild.nodeValue)
        document.getElementById('c_recomendado_'+dato).firstChild.nodeValue = " " + (n_reco + 1).toString()
        document.getElementById('recomendar_texto_'+dato).textContent = ' Recomendado'
        this._RestapiconfService.recomendacion(dato, 'sumar')
        let registroSERP = JSON.parse(localStorage.getItem('registroSERP'))
        if (registroSERP === null){
          let ingresar = [['recomendar',dato]]
          localStorage.setItem('registroSERP', JSON.stringify(ingresar))
          //-console.log('ingresado por 1º vez')
        }
        else{
          //-console.log(registroSERP)
          let esta = false;
          for (let i = 0; i < registroSERP.length; i++) {
            //-console.log(registroSERP[i])
            if (registroSERP[i][0] ==='recomendar'){
              if (registroSERP[i][1] === dato){
                //-console.log('ESTAAAAAAA')
                esta = true;
                registroSERP = registroSERP.splice(i,1);
                //-console.log(registroSERP)
                break;

              }
            }
            
          }
          //-console.log(esta)
          if (!esta){
            registroSERP.push(['recomendar',dato])
            
          }
          localStorage.setItem('registroSERP', JSON.stringify(registroSERP)) 
        }
        
        
        
     
       
      } else {
        let registroSERP = JSON.parse(localStorage.getItem('registroSERP'))
        for (let i = 0; i < registroSERP.length; i++) {
          //-console.log(registroSERP[i])
          if (registroSERP[i][0] ==='recomendar'){
            if (registroSERP[i][1] === dato){
              registroSERP.splice(i,1);
              break;

            }
          }
          
        }
        localStorage.setItem('registroSERP', JSON.stringify(registroSERP)) 
        this.evento_test_sin_modal.next({tipo:'click_recomendar',dato:{texto:'NO_recomendado',id_SERP:dato}})
        document.getElementById('recomendar_'+dato).className = 'btn btn-primary btn-sm'
        let n_reco = parseInt(document.getElementById('c_recomendado_'+dato).firstChild.nodeValue)
        document.getElementById('c_recomendado_'+dato).firstChild.nodeValue = " " + (n_reco - 1).toString()
        this._RestapiconfService.recomendacion(dato, 'restar')
        document.getElementById('recomendar_texto_'+dato).textContent = ' Recomendar'
      }
    }
  }

  ngAfterViewChecked() {
    // viewChild is set after the view has been initialized
    try{
      let registroSERP = JSON.parse(localStorage.getItem('registroSERP'))
        if (registroSERP != null){
          for (let i = 0; i < registroSERP.length; i++) {
            //-console.log(registroSERP[i][0])
            if (registroSERP[i][0] === 'recomendar'){
              if (this.datatest != undefined){
                try{
                  document.getElementById('recomendar_'+String(registroSERP[i][1])).className = 'btn btn-warning btn-sm'
                  document.getElementById('recomendar_texto_'+String(registroSERP[i][1])).textContent = ' Recomendado'
                } catch{}
                
              }
              
            }
            if (registroSERP[i][0] === 'guardar'){
              if (this.datatest != undefined){
                try{
                  document.getElementById('guardar_'+String(registroSERP[i][1])).className = 'btn btn-success btn-sm'
                  document.getElementById('guardar_texto_'+String(registroSERP[i][1])).textContent = ' Guardado'
                } catch{}
                
              }
              
            }
            
          }
        }
    } catch {}
  }

  click_en_ver_desafio(){
    this.toursnippet = false;
    ////-console.log(this.isCollapsed)
    if (this.isCollapsed === true){
      this.evento_test_sin_modal.next({tipo:'click_ver_ocultar_desafio',dato:'ver_desafio'})
    } else {
      this.evento_test_sin_modal.next({tipo:'click_ver_ocultar_desafio', dato:"esconder_desafio"})
    }
   
  }

  finalizardesafio(){
    this.toursnippet = false;
    if (this.array_pagina.length >= 5){
      this.fin_desafio_.next()
    } else {
      this.toastr.warning('Debes revisar todas las paginas', 'Falta revisar algunas paginas', {
        timeOut: 4000
      });
    }
    
  }
  
  click_termino_tour(){
    this.toursnippet = false;
  }

  async ngOnInit() {

    this.evento_test_sin_modal.next({tipo:'pagination',dato:{pagina:this.p}})
    this.isCollapsed = true;
    if (localStorage.getItem('tour') === null){
      this.joyrideService.startTour(
        { steps: ['titulo_desafio', 'detalle_desafio_','veces_recomendado','detalle_recurso','recurso_acciones'],showPrevButton: false, showCounter:false} // Your steps order
      ).subscribe(
        (step) => {
        this.evento_test_sin_modal.next({tipo:'paso_tour',dato:{seccion:step.name}})
      },(error) => {},
        () => {
          this.toursnippet = false;
          localStorage.setItem('tour','terminado');
          this.evento_test_sin_modal.next({tipo:'cerrar_tour',nada:""})
        }
      );
    } else {
      this.toursnippet = false;
    }
    
  }

}
