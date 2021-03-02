import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credenciais } from 'src/app/model/credenciais.model';

@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css']
})
export class UsuarioLoginComponent implements OnInit {

  formLogin: FormGroup;
  isValid: boolean = false;
  isInValid: boolean = true;
  addCan = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
    ) {

      this.formLogin = this.fb.group({
        email: ['', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])],
        senha: ['', Validators.required]
      });

    }

  ngOnInit(): void {
  }

  get f() {
    return this.formLogin.controls;
  }

  login() {
    const formValue = this.formLogin.value;
    const user: Credenciais = {
      email: formValue.email,
      password: formValue.senha
    };

    this.userService.authenticate(user).subscribe(() => {
        this.userService.successfulLogin(user.email);
        this.router.navigate(['/']);
      },
      error => { 
        this.addCan = false;
      }
    )
  }

  cadastro() {
    this.router.navigate(['/cadastro']);
  }

  isFieldValid(): boolean {
    const control = this.f.email;

    if (control.touched || control.value != "") {
      if (control.status === 'VALID') {
        this.isInValid = false;
        return this.isValid = true;
      } else {
        this.isInValid = true;
        return this.isValid = false;
      }
    }

    return false;
  }

  get isFieldInValid() {
    return this.isInValid;
  }

}
