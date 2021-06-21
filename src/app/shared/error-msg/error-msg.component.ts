import { Component } from '@angular/core';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent {
  public error: string | null = '';
  public sucessMsg: string | null = '';

  setError(error: string, time: number = 5000): void {
    this.error = error;
    setTimeout(() => {
      this.error = null;
    }, time);
  }

  setSuccess(message: string, time: number = 5000): void {
    this.sucessMsg = message;
    setTimeout(() => {
      this.error = null;
    }, time);
  }
}
