import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-posttest',
  templateUrl: './posttest.component.html',
  styleUrls: ['./posttest.component.scss']
})
export class PosttestComponent implements OnInit {
  @Output() respuesta_posttest = new EventEmitter<any>();
  @Input() posttest: any;

  constructor(public toastr: ToastrService) { }

  checkpregunta(){
    let hay_error = false;
    for (let i = 0; i < this.posttest.length; i++) {
      try{
        let texto_respuesta = (<HTMLInputElement>document.getElementById('id_'+this.posttest[i].id)).value;
        if (!texto_respuesta.replace(/\s/g, '').length) {
          
          this.toastr.warning('Debes escribir por lo menos una palabra', 'Falta aún', {
            timeOut: 3000
          });
          hay_error = true
          return true
        }
      } catch {
        try {
          let radios = document.getElementsByName('id_'+this.posttest[i].id) ;
          let esta_ok = false;
          if (radios.length >0){
            for (let j = 0, length = radios.length; j < length; j++){
              let temp = radios[j] as HTMLInputElement;
              if (temp.checked){
                this.respuesta_posttest.next([('id_'+this.posttest[j].id).split('_')[1],temp.value,'checkbox']);
                esta_ok = true
                break;
              }
            }
          }
          if (!esta_ok){
            hay_error = true
            this.toastr.warning('Debes seleccionar una alternativa', 'Falta aún', {
              timeOut: 3000
            });
            return true
          }

        } catch{

        }
      }
    }
    if (!hay_error){
      for (let i = 0; i < this.posttest.length; i++) {
        this.checkvalues('id_'+this.posttest[i].id);
      }
    }

  }

  checkvalues(id_pregunta){
    let radios = document.getElementsByName(id_pregunta) ;
    if (radios.length >0){
      for (var i = 0, length = radios.length; i < length; i++){
        let temp = radios[i] as HTMLInputElement;
        if (temp.checked){
          this.respuesta_posttest.next([id_pregunta.split('_')[1],temp.value,'checkbox']);
          break;
        }
      }
    }
    else{
      //-console.log(id_pregunta)
      let texto_respuesta = (<HTMLInputElement>document.getElementById(id_pregunta)).value;
      this.respuesta_posttest.next([id_pregunta.split('_')[1],texto_respuesta,'text']);
    }
    
  }

  ngOnInit() {
  }

}
