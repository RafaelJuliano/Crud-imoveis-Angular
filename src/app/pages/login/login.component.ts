import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { ErrorMsgComponent } from 'src/app/shared/error-msg/error-msg.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild(ErrorMsgComponent) errorMsgComponent!: ErrorMsgComponent;
  public user: LoginUser = {} as LoginUser;
  public load: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    this.login(this.user);
  }

  login(user: LoginUser) {
    this.load = true;
    this.userService.login(user)
      .subscribe((result) => {
        document.cookie = `token=${result.token}`;
        document.cookie = `id=${result.id}`
        document.cookie = ` email=${result.email}`
        this.load = false;
        this.router.navigateByUrl('/')
      }, (error) => {
        if (error.status === 401) {
          this.errorMsgComponent.setError('E-mail ou senha inválidos');
          this.load = false;
        } else {
          this.errorMsgComponent.setError('Falha inesperada ao realizar login');
          this.load = false;
        }
      }
      )
  }
}
