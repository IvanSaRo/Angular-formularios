import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PaisService } from "src/app/services/pais.service";

@Component({
  selector: "app-template",
  templateUrl: "./template.component.html",
  styleUrls: ["./template.component.css"],
})
export class TemplateComponent implements OnInit {
  user = {
    nombre: "",
    apellido: "",
    correo: "",
    pais: "",
    genero: "",
  };
  paises: any[] = [];
  constructor(private paisService: PaisService) {}

  ngOnInit() {
    this.paisService.getPaises().subscribe((paises) => {
      this.paises = paises;
      this.paises.unshift({
        nombre: "Seleccione país",
        codigo: "",
        genero: "",
      });
    });
  }

  guardar(form: NgForm) {
    console.log(form);
    if (form.invalid) {
      Object.values(form.controls).forEach((control) => {
        control.markAllAsTouched();
      });
      return;
    }
  }
}
