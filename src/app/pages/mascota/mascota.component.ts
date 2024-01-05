import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from 'src/app/services/master.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SanidadService } from 'src/app/services/sanidad.service';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.css'],
})
export class MascotaComponent implements OnInit {
  dtElement: any;
  dtTrigger: Subject<void> = new Subject<void>();
  dtOptions: any = {
    columnDefs: [
      { width: '5px', targets: 0 },
      { width: '310px', targets: 1 },
      { width: '8px', targets: 2 },
      { width: '15px', targets: 3 },
    ],
    dom: 'Bfrtip',
    buttons: [
      {
        extend: 'excelHtml5',
        text: 'Exportar a Excel',
        filename: 'PERSONA', // Nombre personalizado del archivo
      },
    ],
    lengthChange: false,
    searching: false,
    lengthMenu: [15],
    paging: true,
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json',
    },
    responsive: false,
  };

  //Variables Globales
  dataAnimal: any;
  datosTipoSexo: any;
  datosTipoEspecie: any;
  // datosTipoDocumento: any;
  // datosTipoGenero: any;
  // datosPais: any;

  //Listado de Persona
  // selectedPais: string = '';

  p_ani_id: number = 0;
  p_esr_id: number = 0;
  p_esp_id: number = 0;
  p_anr_id: number = 0;
  p_ans_id: number = 0;
  p_esr_activo: number = 9;

  animalsel() {
    let post = {
      // p_ani_id: 0,
      // p_esp_id: 0,
      // p_anr_id: 0,
      // p_ans_id: 0,
      // p_ani_nombre: '',
      // p_ani_codigo: '',
      // p_ani_pesnet: 0,
      // p_ani_canpat: 0,
      // p_ani_tamalt: 0,
      // p_ani_tamlar: 0,
      // p_ani_numojo: 0,
      // p_ani_edadan: 0,
      // p_ani_muerto: 0,
      // p_ani_imgfot: '',

      p_ani_id: 0,
      p_esr_id: 0,
      p_esp_id: 0,
      p_anr_id: 0,
      p_ans_id: 0,
      p_esr_activo: 9,
    };
    this.sanidadService.animalsel(post).subscribe({
      next: (data: any) => {
        this.dataAnimal = data;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  especiesel() {
    let post = {
      p_esp_id: 0,
      p_esp_descri: '',
      p_esp_activo: 9,
    };
    this.sanidadService.especiesel(post).subscribe({
      next: (data: any) => {
        this.datosTipoEspecie = data;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  animalsexosel() {
    let post = {
      p_ans_id: 0,
      p_ans_descri: '',
      p_ans_activo: 9,
    };
    this.sanidadService.animalsexosel(post).subscribe({
      next: (data: any) => {
        this.datosTipoSexo = data;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  constructor(
    private appComponent: AppComponent,
    private serviceMaster: MasterService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private serviceSanidad: SanidadService,
    private sanidadService: SanidadService
  ) {
    this.appComponent.login = false;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
  }

  ngOnInit(): void {
    this.animalsel();
    this.especiesel();
    this.animalsexosel();
  }
}
