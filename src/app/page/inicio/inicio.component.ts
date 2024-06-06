import { Component, OnInit } from '@angular/core';
import { RequirementService } from 'src/app/core/service/requerimiento.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  lstotales: any = {
    "totalRequerimiento": 0,
    "totalRequerimientoPendientes": 0,
    "totalRequerimientoAprobados": 0,
    "totalPropuestas": 0
  }
  constructor(private requirementService: RequirementService) {
  }
  ngOnInit(): void {
    this.getTotales()
    
  }
  getTotales() {
    this.requirementService.getTotales()
    .subscribe({
      next: (res: any) => {
        this.lstotales = res
      },
      error:(error: any) => {
        console.log("Error: ", error)
      }
    })
  
  }
}
