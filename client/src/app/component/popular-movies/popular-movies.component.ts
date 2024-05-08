import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {NavbarComponent} from '../navbar/navbar.component'
@Component({
  selector: 'app-popular-movies',
  standalone: true,
  imports: [MatInputModule, MatDividerModule, MatCardModule,MatToolbarModule,MatIconModule,MatFormFieldModule,NavbarComponent],
  templateUrl: './popular-movies.component.html',
  styleUrl: './popular-movies.component.css'
})
export class PopularMoviesComponent {

}