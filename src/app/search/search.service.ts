import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResult } from './search-result.interface';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient,
  ) {}

  search(searchTerm: string, offset: number = 0) {
    return this.http.get<SearchResult[]>('http://localhost:3000', {
      params: {
        search: searchTerm,
        offset: offset,
      }
    });
  }
}
