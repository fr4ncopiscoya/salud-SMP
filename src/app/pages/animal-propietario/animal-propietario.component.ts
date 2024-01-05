import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { MasterService } from 'src/app/services/master.service';
import { SanidadService } from 'src/app/services/sanidad.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { AnonymousSubject } from "rxjs/internal/Subject";

@Component({
  selector: 'app-animal-propietario',
  templateUrl: './animal-propietario.component.html',
  styleUrls: ['./animal-propietario.component.css']
})
export class AnimalPropietarioComponent implements OnInit {

  param_ani_id: string = "";

  constructor(private modalService: BsModalService, private appComponent: AppComponent
    , private serviceMaster: MasterService
    , private router: Router
    , private route: ActivatedRoute
    , private spinner: NgxSpinnerService
    , private serviceSanidad: SanidadService) {
    this.appComponent.login = false;
  }

  ngOnInit(): void {
    this.param_ani_id = this.route.snapshot.params['ani_id'];
  }



}