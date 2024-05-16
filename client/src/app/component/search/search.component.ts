import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MoviesService } from '../../services/backend-api/movies.service';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatIconModule, CommonModule,RouterModule,FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  @ViewChild('noMovie') noMovie: ElementRef | undefined;

  ngAfterViewInit() {
    //this is to show the no movie found message when movies.length = 0
    if (this.movies.length === 0 ) {
      this.noMovie.nativeElement.selected = 'true';
    }
  }

  movies: any = {results: []}
  public query: string = '';
  constructor(private moviesService: MoviesService) { }  ngOnInit(): void {
  }
  onSearch(query: string) {
    this.moviesService.searchedMovies(query).subscribe((data: any) => {
      console.log(data)
      this.movies = data
    })
  }
  onquery(event: any) {
    this.query = event.target.value
    this.onSearch(this.query)
  }
}
