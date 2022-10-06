import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginBoxService } from './auth.service';
import { SocialUser } from "@abacritt/angularx-social-login";
import { LoginService } from 'src/app/shared/service/login.service';
import { UsuarioDTO } from 'src/app/shared/model/userDTO';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.css']
})
export class LoginBoxComponent implements OnInit {

  register: boolean = false;
  remember: boolean = false;
  rememberTwo: boolean = false;
  loading: boolean = false;
  mostrarMenu: boolean = false;

  user: SocialUser; // user facebook
  isLogin: boolean = false; // veirifcacao de login
  loggedIn!: boolean; // verificacao de login
  users: any//gapi.auth2.GoogleUser; // usuarios vinculados ao google
  sizes = window.innerWidth;
  fileToUpload: any;

  usuario: any = {};
  remembers: any = {};

  formGroup: any = this.formBuilder.group({
    user: [null, [Validators.required, Validators.email]], // email
    senha: [null, [Validators.required]], // senha
  })

  formGroupRemember: any = this.formBuilder.group({
    user: [null, [Validators.required, Validators.email]], // email
  })

  formGroupRememberTwo: any = this.formBuilder.group({
    user: [null, [Validators.required, Validators.email]], // email
    token: [null, [Validators.required]],
    newPassword: [null, [Validators.required]] //nova senha
  })

  formGroupRegister: any = this.formBuilder.group({
    name: [null, [Validators.required]], // nome
    user: [null, [Validators.required, Validators.email]], // email
    senha: [null, [Validators.required]], // senha
    foto: [null],
  })

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.sizes = window.innerWidth;
  }

  constructor(
    private formBuilder: FormBuilder,
    private loginAuth: LoginBoxService,
    private loginService: LoginService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  getUserForm(): void {
    Object.keys(this.formGroupRegister.value).forEach((key: any) => {
      if (this.formGroupRegister.value[key] === '') {
        this.formGroupRegister.value[key] = null;
      }
    })

    this.usuario = {
      username: this.formGroupRegister.value.user,
      nome: this.formGroupRegister.value.name,
      email: this.formGroupRegister.value.user,
      foto: null,
      password: this.formGroupRegister.value.senha,
      tipoUsuario: 'USER',
      ultimoAcesso: null,
      dtCadastro: null
    }
  }


  getRememberForm(): void {
    Object.keys(this.formGroup.value).forEach((key: any) => {
      if (this.formGroup.value[key] === '') {
        this.formGroup.value[key] = null;
      }
    })

    this.remembers = {
      token: this.formGroupRememberTwo.value.token,
      email: this.formGroupRememberTwo.value.user,
      novaSenha: this.formGroupRememberTwo.value.newPassword,
    }
  }

  stepActionButtons(button: any) {
    switch (button) {
      case 'login':
        // this.register = false;
        this.fazendoLogin();
        break;
      case 'loginFacebook':
        this.signInWithFB();
        break;
      case 'loginGoogle':
        this.signIn();
        break;
      case 'cadastrar':
        this.register = true;
        this.remember = false;
        this.rememberTwo = false;
        break;
      case 'esqueciSenha':
        this.remember = true;
        console.log('opa')
        break;
      case 'voltar':
        this.register = false;
        this.remember = false;
        this.rememberTwo = false;
        break;
      case 'registrar':
        this.registerUser();
        break;
      case 'recuperar':
        this.rememberMyPassword(this.formGroupRemember.value.user);
        this.rememberTwo = false;
        break;
      case 'mudar':
        this.recuperar();
        break;
    }
  }

  validTouch(field: string) {
    if (!this.formGroup || this.formGroup.get(field) || !this.formGroupRegister || this.formGroupRegister.get(field) || !this.formGroupRemember || this.formGroupRemember.get(field) || !this.formGroupRememberTwo || this.formGroupRememberTwo.get(field)) {
      return false
    }
    return !this.formGroup.get(field).valid && this.formGroup.get(field).touched || !this.formGroupRegister.get(field).valid && this.formGroupRegister.get(field).touched || !this.formGroupRemember.get(field).valid && this.formGroupRemember.get(field).touched || !this.formGroupRememberTwo.get(field).valid && this.formGroupRememberTwo.get(field).touched;
  }

  signIn() {
    this.mostrarLoading()
    this.loginAuth.loginWithGoogle();
  }

  signInWithFB(): void {
    this.mostrarLoading()
    this.loginAuth.loginWithFacebook().then;
  }

  fazendoLogin() {
    this.mostrarLoading()
    this.loginAuth.login(this.formGroup.value.user, this.formGroup.value.senha)
  }

  mostrarMenus() {
    this.loginAuth.mostrarMenuEmmiter.subscribe(response => {
      this.mostrarMenu = response;
    })
  }

  mostrarLoading() {
    this.loginAuth.loading.subscribe(response => {
      this.loading = response;
    })
  }

  selectFile(event: any) {
    this.fileToUpload = <File>event.target.files[0];
  }

  registerUser() {
    this.loading = true
    this.getUserForm()
    console.log(this.usuario)
    this.loginService.registerUser(this.usuario).subscribe((response) => {
      this.loading = false;
      if (response) {
        this.register = false;
        this.loading = false;
        this.toastr.success('Usuario Cadastrado com sucesso!', 'Sucesso', {
          timeOut: 600,
        })
      }
    }, error => {
      this.loading = false;
      this.toastr.error('Ops, houve um erro ao cadastrar seu usuario', 'Erro', {
        timeOut: 600,
      })
    })
  }

  rememberMyPassword(email: any) {
    this.loading = true

    let params = {
      email: email
    }

    this.loginService.postRemember(params.email).subscribe(response => {
      console.log(response)
      this.rememberTwo = true;
      this.loading = false
      this.toastr.success(response.mensagem, 'Sucesso', {
        timeOut: 2000,
      })
    }, error => {
      this.toastr.error(error.mensagem, 'Error', {
        timeOut: 2000,
      })
      console.error(error)
    })
  }

  recuperar() {
    this.getRememberForm();
    this.loading = true

    this.loginService.rememberNow(this.remembers).subscribe(response => {
      this.voltar();
      this.loading = false
      this.toastr.success("Senha alterada com sucesso", 'Sucesso', {
        timeOut: 2000,
      })
    }, error => {
      this.toastr.error("Ops houve um erro", 'Error', {
        timeOut: 2000,
      })
    })
  }

  voltar() {
    this.register = false;
    this.remember = false;
    this.rememberTwo = false;
  }

}
