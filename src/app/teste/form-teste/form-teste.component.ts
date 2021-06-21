import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { MustMatch } from 'src/app/must-match.validator';



@Component({
    selector: 'app-form-teste',
    templateUrl: './form-teste.component.html',
    styleUrls: ['./form-teste.component.css']
})
export class FormTesteComponent implements OnInit {
    formUser!: FormGroup;
    public user: User = {} as User;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {

        this.createForm(this.user);
    }

    createForm(user: User): void {
        this.formUser = this.formBuilder.group({
            name: [user.name, Validators.required],
            email: [user.email, [Validators.required, Validators.email]],
            cpf: [user.cpf, [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/), Validators.maxLength(14)]],
            pwd: [user.pwd, [Validators.required, Validators.minLength(6)]],
            confirmPwd: ['', Validators.required]
        }, { validator: MustMatch('pwd', 'confirmPwd') }
        );
    }

    onSubmit(): void {
        this.user.name = 'Altera nome';
        console.log(this.user.name);
        console.log(this.formUser.value);
    }

}
