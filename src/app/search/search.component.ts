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
  isSearchingScroll = false;
  searchResult: SearchResult[];
  offset = 0;

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
    if (this.form.invalid) return;

    const {searchTerm} = this.form.value;
    this.offset = 0;

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

  scrollSearch() {
    if (this.form.invalid || this.isSearchingScroll) return;

    this.isSearchingScroll = true;
    this.form.disable();

    const {searchTerm} = this.form.value;
    this.offset += 10;

    lastValueFrom(this.searchService.search(searchTerm!, this.offset))
      .then(result => {
        this.searchResult.push(...result);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        this.isSearchingScroll = false;
        this.form.enable();
      });
  }
}
