import { Component, OnInit ,Input,Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pretest',
  templateUrl: './pretest.component.html',
  styleUrls: ['./pretest.component.scss']
})
export class PretestComponent implements OnInit {
  @Output() respuesta_pretest = new EventEmitter<any>();
  @Input() pretestdata: any;

  constructor(public toastr: ToastrService) { }

  checkpregunta(){
    let hay_error = false;
    for (let i = 0; i < this.pretestdata.length; i++) {
      try{
        let texto_respuesta = (<HTMLInputElement>document.getElementById('id_'+this.pretestdata[i].id)).value;
        if (!texto_respuesta.replace(/\s/g, '').length) {
          
          this.toastr.warning('Debes escribir por lo menos una palabra', 'Falta aún', {
            timeOut: 3000
          });
          hay_error = true
          return true
        }
      } catch {
        try {
          let radios = document.getElementsByName('id_'+this.pretestdata[i].id) ;
          let esta_ok = false;
          if (radios.length >0){
            for (let j = 0, length = radios.length; j < length; j++){
              let temp = radios[j] as HTMLInputElement;
              if (temp.checked){
                this.respuesta_pretest.next([('id_'+this.pretestdata[j].id).split('_')[1],temp.value,'checkbox']);
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
      for (let i = 0; i < this.pretestdata.length; i++) {
        this.checkvalues('id_'+this.pretestdata[i].id);
      }
    }
    
  }

  checkvalues(id_pregunta){
    let radios = document.getElementsByName(id_pregunta) ;
    if (radios.length >0){
      for (var i = 0, length = radios.length; i < length; i++){
        let temp = radios[i] as HTMLInputElement;
        if (temp.checked){
          this.respuesta_pretest.next([id_pregunta.split('_')[1],temp.value,'checkbox']);
          break;
        }
      }
    }
    else{
      let texto_respuesta = (<HTMLInputElement>document.getElementById(id_pregunta)).value;
      this.respuesta_pretest.next([id_pregunta.split('_')[1],texto_respuesta,'text']);
    }
  }
  ngOnInit() {
    
  }

}
