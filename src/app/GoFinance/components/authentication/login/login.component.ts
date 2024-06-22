import { Component, OnInit } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatTooltip} from "@angular/material/tooltip";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../../core/services/auth.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatIcon,
    MatCheckbox,
    MatButton,
    MatInput,
    MatIconButton,
    MatTooltip,
    RouterLink,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'password': new FormControl(null, [Validators.required, Validators.min(8)]),
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => this.router.navigate(['/history']),
        error: (err) => {
          let errorMessage = '';
          if (err.error.message === 'Bad credentials') {
          errorMessage = 'Contraseña incorrecta';
          } else if (err.error.message === 'UserDetailsService returned null, which is an interface contract violation') {
          errorMessage = 'No existe cuenta con este correo electrónico';
          }
          this.dialog.open(ErrorDialogComponent, {
          width: '500px',
          data: errorMessage
          });
        }
      })
    }
  }

}
