import { Component, TemplateRef, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from 'src/app/services/master.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SanidadService } from 'src/app/services/sanidad.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-crear-mascota',
  templateUrl: './crear-mascota.component.html',
  styleUrls: ['./crear-mascota.component.css'],
})
export class CrearMascotaComponent implements OnInit {
  //Variables para Modal
  modalRef: any = BsModalRef;

  imageChangedEvent: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  openModal(template: TemplateRef<any>, clase: string) {
    this.modalRef = this.modalService.show(template, { class: clase });
  }

  cerrarModal() {
    this.modalRef?.hide();
  }

  // onFileSelected(event: any): void {
  //   this.imageChangedEvent = event;
  //   const file: File = event.target.files[0];

  //   this.selectedFile = file;
  //   this.p_imgfot = this.selectedFile.name;
  //   var p_car_imgext = this.p_imgfot
  //     .slice(((this.p_imgfot.lastIndexOf('.') - 1) >>> 0) + 2)
  //     .toLocaleLowerCase();

  //   if (
  //     p_car_imgext == 'jpeg' ||
  //     p_car_imgext == 'png' ||
  //     p_car_imgext == 'jpg'
  //   ) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.imageUrl = e.target.result;
  //     };
  //     reader.readAsDataURL(file);
  //     document.getElementById('btnmodalimagen')?.click();
  //   } else {
  //     Swal.fire(
  //       'Solo se admite archivos con extensión jpeg , png o jpg',
  //       'Vuelva a intentarlo',
  //       'error'
  //     );

  //     const fileInput = document.getElementById(
  //       'fileimagenup'
  //     ) as HTMLInputElement;
  //     if (fileInput) {
  //       fileInput.value = ''; // Esto restablecerá el valor del input file
  //       this.imageUrl = this.textoimagenurl;
  //     }
  //   }
  // }

  constructor(
    private appComponent: AppComponent,
    private serviceMaster: MasterService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private serviceSanidad: SanidadService,
    private modalService: BsModalService
  ) {
    this.appComponent.login = false;
  }

  ngOnInit(): void {}
}
