import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/app/model/user.model";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-usuario-cadastro",
  templateUrl: "./usuario-cadastro.component.html",
  styleUrls: ["./usuario-cadastro.component.css"],
})
export class UsuarioCadastroComponent implements OnInit {
  formCadastro: FormGroup;
  isValid: boolean = false;
  isInValid: boolean = true;
  addCan = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.formCadastro = this.fb.group({
      nome: ["", Validators.required],
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ]),
      ],
      senha: ["", Validators.required],
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.formCadastro.controls;
  }

  cadastrar() {
    const formValue = this.formCadastro.value;
    const user: User = {
      name: formValue.nome,
      email: formValue.email,
      password: formValue.senha,
    };

    this.userService.create(user).subscribe(() => {
        this.userService.showMessage('Cadastro realizado com sucesso');
        this.router.navigate(["/login"]);
      },
      (error) => {
        this.addCan = false;
      }
    );
  }

  cancelar() {
    this.router.navigate(["/login"]);
  }

  isFieldValid(): boolean {
    const control = this.f.email;

    if (control.touched || control.value != "") {
      if (control.status === "VALID") {
        this.isInValid = false;
        return (this.isValid = true);
      } else {
        this.isInValid = true;
        return (this.isValid = false);
      }
    }

    return false;
  }

  get isFieldInValid() {
    return this.isInValid;
  }
}
