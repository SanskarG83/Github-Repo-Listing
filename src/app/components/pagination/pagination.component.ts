import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() pageSize: number = 50;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  currentPage: number = 1;

  constructor() {}

  nextPage() {
    this.currentPage++;
    this.emitPageChange();
  }

  prevPage() {
    this.currentPage--;
    this.emitPageChange();
  }

  emitPageChange() {
    this.pageChange.emit(this.currentPage);
  }
}
