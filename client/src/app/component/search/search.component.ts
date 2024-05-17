import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MoviesService } from '../../services/backend-api/movies.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatIconModule, MatAutocompleteModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

   public notFound: boolean = false
  
  public movies: any[];
  public query: string = '';
  constructor(private moviesService: MoviesService
  ) { } ngOnInit(): void {
  }
  onSearch(query: string) {
    this.moviesService.searchedMovies(query).subscribe((data: any) => {
      console.log(data);
      if (data.length === 0) {
        this.notFound = !this.notFound
      }
      this.movies = data;
    })
  }
  onquery(event: any) {
    this.query = event.target.value
    this.onSearch(this.query)
  }
  toDetails(input: string) {
    console.log(input)
  }
}
