import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {JwtTokenService} from '../../services/core-services/auth-services/jwt-token.service';
import {UserApiService} from '../../services/core-services/api/user-api/user-api.service';
import {FormApiService} from '../../services/core-services/api/form-api/form-api.service';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent implements OnInit {

  @ViewChild('json') jsonElement?: ElementRef;
  public form = {
    components: []
  };
  formName = '';
  token = '';
  isLogged: boolean;
  user = {
    password: null,
    email: null,
  };

  constructor(
    private jwtTokenService: JwtTokenService,
    private userApiService: UserApiService,
    private formApiService: FormApiService,
  ) { }

  ngOnInit(): void {
    this.userApiService.signedInUser().subscribe(res => {
      console.log(res);
    });
    this.checkToken();
  }

  onChange(event): void {
    this.jsonElement.nativeElement.innerHTML = '';
    this.jsonElement.nativeElement.appendChild(document.createTextNode(JSON.stringify(event.form, null, 4)));
  }

  saveForm(form): void {
    this.formApiService.saveForm({
      name: this.formName,
      active: true,
      metadata: form,
    }).subscribe(res => {
      console.log(res);
    });
  }
  updateForm(): void {
    this.formApiService.updateForm('1', {
      name: this.formName,
      active: true,
      metadata: this.form,
    }).subscribe(res => {
      console.log(res);
    });
  }
  deleteForm(): void {
    this.formApiService.deleteForm('1').subscribe(res => {
      console.log(res);
    });
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
}
