import { Component, OnInit, ViewChild } from '@angular/core';
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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {

    console.log(this.user)
    this.login(this.user);
  }

  login(user: LoginUser) {
    this.load = true;
    this.userService.login(user)
      .subscribe((result) => {
        console.log(result);
        document.cookie = 'token='+result.token;
        this.load = false;
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
