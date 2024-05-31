import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HistorialComponent} from "./GoFinance/components/historial/historial.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HistorialComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GoFinance';
}
