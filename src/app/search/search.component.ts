import { Component } from '@angular/core';
import { SearchResult } from './search-result.interface';
import { SearchService } from './search.service';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

import { faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  isSearching = false;
  searchResult: SearchResult[];

  faMagnifyingGlass = faMagnifyingGlass;
  faSpinner = faSpinner;

  form = this.fb.group({
    searchTerm: ['', [Validators.required]],
  });

  constructor(
    private searchService: SearchService,
    private fb: FormBuilder,
  ) {}

  search() {
    const {searchTerm} = this.form.value;

    this.isSearching = true;
    this.form.disable();

    lastValueFrom(this.searchService.search(searchTerm!))
      .then(result => {
        this.searchResult = result;
      })
      .catch(err => {
        console.error(err);
        this.searchResult = [];
      })
      .finally(() => {
        this.isSearching = false;
        this.form.enable();
      });
  }
}
