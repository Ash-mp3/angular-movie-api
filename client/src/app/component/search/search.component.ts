import { CommonModule } from '@angular/common';
import { Component, OnInit, } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SearchService } from '../../services/search.service';
import { Movie } from '../../models/movie';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatIconModule, CommonModule,],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  movies: any
  public query: string = '';
  constructor(private searchService: SearchService) { }
  ngOnInit(): void {
  }
  onSearch(query: string) {
    if (this.query.length >= 2) {
      this.searchService.getquery('https://api.themoviedb.org/3/search/movie?query=' + query + '&include_adult=true&language=en-US&page=1').subscribe(
        (result) => { this.movies = result; console.log(this.movies.results); return this.movies.results }
        , (error) => { console.error(error) }
      )
    } else {
      alert('Please enter at least 2 characters')
    }
  }
  oninput(event: Event) {
    const input = event.target as HTMLInputElement;
    const char = input.value.slice(-1);
    this.query += char;
    this.onSearch(this.query)
  }
  onquery(event: any) {
    this.query = event.target.value
    this.onSearch(this.query)
  }
}
