import { Component, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss'],
})
export class SearchProductComponent {
  @Output()
  searchProducName: EventEmitter<string> = new EventEmitter<string>();

  private searchSubject: Subject<string> = new Subject();

  constructor(private loading: LoadingService) {}

  ngOnInit() {
    this.searchSubject.pipe(debounceTime(1000)).subscribe((searchText) => {
      this.performSearch(searchText);
    });
  }

  onSearchChange(event: any) {
    this.searchSubject.next(event.target.value);
  }

  performSearch(searchText: string) {
    this.searchProducName.emit(searchText);
  }
}
