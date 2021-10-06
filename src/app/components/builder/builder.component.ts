import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {JwtTokenService} from '../../services/core-services/auth-services/jwt-token.service';

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
  isNeedToken: boolean;

  constructor(
    private jwtTokenService: JwtTokenService,
  ) { }

  ngOnInit(): void {
    this.checkToken();
    console.log(this.isNeedToken);
  }

  onChange(event): void {
    this.jsonElement.nativeElement.innerHTML = '';
    this.jsonElement.nativeElement.appendChild(document.createTextNode(JSON.stringify(event.form, null, 4)));
  }

  saveForm(form): void {
    const collection = JSON.parse(localStorage.getItem('customFormTemplates') ?? '[]');
    console.log(collection);
    const newForm = {
      name: this.formName,
      template: form
    };
    collection.push(newForm);
    localStorage.setItem('customFormTemplates', JSON.stringify(collection));
  }

  checkToken(): void {
    this.isNeedToken = !this.jwtTokenService.hasToken();
  }

  setToken(token): void {
    this.jwtTokenService.token = token;
    this.token = null;
    this.isNeedToken = !this.jwtTokenService.hasToken();
  }
}
