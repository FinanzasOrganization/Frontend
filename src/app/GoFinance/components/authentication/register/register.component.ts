import { Component, OnInit } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatTooltip} from "@angular/material/tooltip";
import {Router, RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {AuthService} from "../../../../core/services/auth.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatButton,
    MatCheckbox,
    MatIcon,
    MatIconButton,
    MatInput,
    MatTooltip,
    RouterLink,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  passwordTooltip: string = `
    <ul>
      <li>Letras y números</li>
      <li>Debe combinar letras mayúsculas y minúsculas</li>
      <li>Debe incluir caracteres especiales</li>
      <li>La longitud de la contraseña debe ser igual o mayor a 8 caracteres</li>
    </ul>
  `;

  name: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  register(): void {
    this.authService.register(this.name, this.lastname, this.email, this.password).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => console.error('Register failed', err)
    });
  }

}
