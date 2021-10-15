import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {JwtTokenService} from '../../services/core-services/auth-services/jwt-token.service';
import {UserApiService} from '../../services/core-services/api/user-api/user-api.service';
import {FormApiService} from '../../services/core-services/api/form-api/form-api.service';
import {Formio} from 'formiojs';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent implements OnInit {

  @ViewChild('json') jsonElement?: ElementRef;
  public form = {
    id: null,
    metadata: { components: []},
    name: 'New Form',
    active: false
  };
  token = '';
  isLogged: boolean;
  user = {
    password: null,
    email: null,
  };
  formList$ = this.formApiService.getForms();

  constructor(
    private jwtTokenService: JwtTokenService,
    private userApiService: UserApiService,
    private formApiService: FormApiService,
  ) { }

  ngOnInit(): void {
    Formio.setBaseUrl(location.origin);
    this.checkToken();
  }

  onChangeForm(form): void {
    this.jsonElement.nativeElement.innerHTML = '';
    this.jsonElement.nativeElement.appendChild(document.createTextNode(JSON.stringify(form, null, 4)));
  }

  saveForm(form): void {
    this.getAction(form).subscribe();
  }

  getAction(form): any {
    if (form.id) {
      return this.formApiService.updateForm(form.id, form);
    } else {
      return this.formApiService.createForm(form);
    }
  }

  checkToken(): void {
    this.isLogged = this.jwtTokenService.hasToken();
  }

  setToken(token): void {
    this.jwtTokenService.token = token;
    this.token = null;
    this.checkToken();
  }

  login(user): void {
    const credentials = {
      user: {
        email: user.email,
        password: user.password,
        remember_me: false,
      },
      commit: 'Log in',
      format: 'json'
    };
    this.userApiService.signIn(credentials).subscribe(val => {
      this.user.email = null;
      this.user.password = null;
      this.checkToken();
    });
  }

  clearForm(): void {
    this.form = {
      id: null,
      metadata: { components: []},
      name: 'New Form',
      active: false
    };
    this.jsonElement.nativeElement.innerHTML = '';
  }

  getForm(): void {
    this.formApiService.getForm(4).subscribe();
  }


  deleteForm(): void {
    this.formApiService.deleteForm('1').subscribe(res => {
      console.log(res);
    });
  }

  selectForm(form): void {
    this.form = form;
    this.onChangeForm(form.metadata);
  }
}
