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
    this.spinner.show();
    const data_post = {
      p_ani_id: this.p_ani_id,
      p_esr_id: this.p_esr_id,
      p_esp_id: this.p_esp_id,
      p_anr_id: this.p_anr_id,
      p_ans_id: this.p_ans_id,
      p_esr_activo: this.p_esr_activo,
    };

    this.serviceSanidad.animalsel(data_post).subscribe({
      next: (data: any) => {
        this.spinner.show();
        this.dataAnimal = data;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
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
    private serviceSanidad: SanidadService
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
    // this.animalsel();
  }
}
