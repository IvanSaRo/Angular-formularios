import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ValidatorsService } from "src/app/services/validators.service";

@Component({
  selector: "app-reactive",
  templateUrl: "./reactive.component.html",
  styleUrls: ["./reactive.component.css"],
})
export class ReactiveComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService
  ) {
    this.createForm();
    this.loadForm();
    this.createListeners()
  }

  ngOnInit() {}

  get invalidName() {
    return this.form.get("name").invalid && this.form.get("name").touched;
  }

  get invalidSurname() {
    return this.form.get("surname").invalid && this.form.get("surname").touched;
  }

  get invalidEmail() {
    return this.form.get("email").invalid && this.form.get("email").touched;
  }

  get invalidUser() {
    return this.form.get("user").invalid && this.form.get("user").touched;
  }

  get invalidDistrict() {
    return (
      this.form.get("address.district").invalid &&
      this.form.get("address.district").touched
    );
  }

  get invalidCity() {
    return (
      this.form.get("address.city").invalid &&
      this.form.get("address.city").touched
    );
  }

  get invalidPassword1() {
    return (
      this.form.get("password1").invalid &&
      this.form.get("password1").touched
    );
  }

  get invalidPassword2() {
    const pass1 = this.form.get("password1").value;
    const pass2 =this.form.get("password2").value

    return (pass1 === pass2) ? false : true;
  }

  //Este get es solo para hacer referencia al array, indicamos el as FormArray para que el sistema sepa que tratamos un array
  get hobbiesArray() {
    return this.form.get("hobbies") as FormArray;
  }

  createForm() {
    this.form = this.formBuilder.group({
      /* campo: ['1er argumento','2º','3º'] 1º valor por defecto, 2º validadores síncronos, 3º validadores asíncronos */

      name     :  ["", [Validators.required, Validators.minLength(2)]],
      surname  :  ["", [Validators.required, this.validatorsService.noSanchez]],
      email    :  ["", [Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$"),Validators.required]],
      user     :  ["", , this.validatorsService.userExist],
      password1:  ["", Validators.required],
      password2:  ["", Validators.required],
      address  :  this.formBuilder.group({
       district:   ["", Validators.required],
       city    :   ["", Validators.required],
      }),
      hobbies  :  this.formBuilder.array([]),
    }, {
      validators: this.validatorsService.passwordsOk("password1","password2")
    });
  }

  createListeners(){
    this.form.valueChanges.subscribe( value => {
      console.log(value)
    })

    this.form.statusChanges.subscribe( status => {
      console.log( status )
    })

    this.form.get("name").valueChanges.subscribe( console.log )// subscribirse a 1 campo
  }

  loadForm() {
    this.form.reset({
      name: "",
      surname: "",
      email: "",
      password1: "",
      password2: "",
      address: {
        district: "",
        city: "",
      },
    });
  }

  addHobby() {
    this.hobbiesArray.push(this.formBuilder.control("", Validators.required));
  }

  save() {
    console.log(this.form);
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) => {
            control.markAllAsTouched();
          });
        } else {
          control.markAllAsTouched();
        }
      });
    }
    //this.form.reset();
  }

  removeHobby(i: number) {
    this.hobbiesArray.removeAt(i);
  }
}
