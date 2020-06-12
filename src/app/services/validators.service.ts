import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable } from 'rxjs';



interface ErrorValidation {
  [s: string]: boolean
}
@Injectable({
  providedIn: "root",
})
export class ValidatorsService {
  constructor() {}

  noSanchez(control: FormControl): ErrorValidation {
    if (control.value?.toLowerCase() === "sanchez") {
      return {
        noSanchez: true,
      };
    }

    return null;
  }

  passwordsOk(pass1Name: string, pass2Name){
    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      }else {
        pass2Control.setErrors({notTheSame: true})
      }
    }
  }


  userExist(control: FormGroup): Promise<ErrorValidation> | Observable<ErrorValidation>{
if(!control.value){
  return Promise.resolve(null); //si no existe value en el campo resuelve null indicando todo ok
}
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(control.value === "nuke"){
          resolve({ exist: true });
        }else {
          resolve( null )
        }
      }, 2500)
    })
  }
}
