import { Component, TemplateRef, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from 'src/app/services/master.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SanidadService } from 'src/app/services/sanidad.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { LoadedImage } from 'ngx-image-cropper';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-mascota',
  templateUrl: './crear-mascota.component.html',
  styleUrls: ['./crear-mascota.component.css'],
})
export class CrearMascotaComponent implements OnInit {
  //Variables para Modal
  modalRef: any = BsModalRef;

  imageChangedEvent: any = '';
  croppedImage: any = 'assets/images/avatardefault_92824.png';
  imageUrl: string | null = 'assets/images/avatardefault_92824.png';
  selectedFile: File | null = null;
  p_imgfot: string = '';
  textoimagenurl: any = 'assets/images/avatardefault_92824.png';
  imagenrecort: File | null = null;
  form!: FormGroup;

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  GuardarCambiosImagen() {
    this.imageUrl = this.croppedImage;
    this.cerrarModal();
  }

  openModal(template: TemplateRef<any>, clase: string) {
    this.modalRef = this.modalService.show(template, { class: clase });
  }

  cerrarModal() {
    this.modalRef?.hide();
  }

  onFileSelected(event: any): void {
    this.imageChangedEvent = event;
    const file: File = event.target.files[0];

    this.selectedFile = file;
    this.p_imgfot = this.selectedFile.name;
    var p_car_imgext = this.p_imgfot
      .slice(((this.p_imgfot.lastIndexOf('.') - 1) >>> 0) + 2)
      .toLocaleLowerCase();

    if (
      p_car_imgext == 'jpeg' ||
      p_car_imgext == 'png' ||
      p_car_imgext == 'jpg'
    ) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
      document.getElementById('btnmodalimagen')?.click();
    } else {
      Swal.fire(
        'Solo se admite archivos con extensión jpeg , png o jpg',
        'Vuelva a intentarlo',
        'error'
      );

      const fileInput = document.getElementById(
        'fileimagenup'
      ) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = ''; // Esto restablecerá el valor del input file
        this.imageUrl = this.textoimagenurl;
      }
    }
  }

  imageLoaded(image: LoadedImage) {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }

  async getObjectUrlBlob(objectUrl: string): Promise<File> {
    const response = await fetch(objectUrl);
    const blob = await response.blob();

    // Puedes ajustar el nombre del archivo según tus necesidades
    const fileName = this.p_imgfot;

    // Crear un nuevo archivo con el Blob y el nombre
    const file = new File([blob], fileName, { type: blob.type });

    return file;
  }

  dataURItoBlob(dataURI: string | undefined): Blob | null {
    if (!dataURI || typeof dataURI !== 'string') {
      console.error('dataURI no es válido:', dataURI);
      return null;
    }

    const commaIndex = dataURI.indexOf(',');
    if (commaIndex === -1) {
      console.error('dataURI no contiene una coma (,):', dataURI);
      return null;
    }

    const byteString = atob(dataURI.slice(commaIndex + 1));
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([int8Array], { type: 'image/png' });
  }

  imageCropped(event: any) {
    console.log(event);
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);

    this.getObjectUrlBlob(event.objectUrl)
      .then((file) => {
        // Manejar el archivo recortado como sea necesario
        this.imagenrecort = file;
        console.log('Archivo recortado:', this.imagenrecort);
      })
      .catch((error) => {
        console.error('Error al obtener el Blob:', error);
      });

    if (event.base64) {
      this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
        event.objectUrl
      );
      const fileBlob = this.dataURItoBlob(event.base64);
      if (fileBlob) {
        const file = new File([fileBlob], this.p_imgfot, { type: 'image/png' });
        /* this.selectedFile = file; */
        console.log('Archivo recortado:', file);
      } else {
        console.error('No se pudo convertir la imagen recortada a Blob.');
      }
    } else {
      console.error('base64 en event es undefined.');
    }
  }

  constructor(
    private appComponent: AppComponent,
    private serviceMaster: MasterService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private serviceSanidad: SanidadService,
    private modalService: BsModalService,
    private sanitizer: DomSanitizer
  ) {
    this.appComponent.login = false;
  }

  ngOnInit(): void {}
}
