import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Repository } from '../../models/repository.model';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent {
  @Input() repositories: Repository[] = [];
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  pageSize: number = 10;
  // Add pagination logic and properties if needed

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }
}
