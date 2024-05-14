import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
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

  @ViewChild('noMovie') noMovie: ElementRef | undefined;

  ngAfterViewInit() {
    if (!this.movies) {
      this.noMovie.nativeElement.selected = 'true';
    }
  }

  movies: any
  public query: string = '';
  constructor(private searchService: SearchService) { }
  ngOnInit(): void {
  }
  onSearch(query: string) {
      this.searchService.getquery('https://api.themoviedb.org/3/search/movie?query=' + query + '&include_adult=true&language=en-US&page=1').subscribe(
        (result) => { this.movies = result; console.log(this.movies); return this.movies }
        , (error) => { console.error(error) }
      )
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
