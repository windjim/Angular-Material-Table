import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ViewportRuler } from '@angular/cdk/scrolling';

// 改變分頁器文字
@Injectable()
class CustomMatPaginatorIntl extends MatPaginatorIntl {
  itemsPerPageLabel = '筆數/頁';
}



@Component({
  selector: 'app-expansion-table',
  templateUrl: './expansion-table.component.html',
  styleUrls: ['./expansion-table.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }],
})
export class ExpansionTableComponent implements OnInit {
  // 外部引入
  @Input() elementData: any[] = [
    {
      "applyTime": "2025/03/11",
      "caseNo": "2025031100004",
      "idNo": "A184385581",
      "applyOption": "FO",
    },
    {
      "applyTime": "2025/08/15",
      "caseNo": "2025011400012",
      "idNo": "A127944600",
      "applyOption": "FO",

    },
    {
      "applyTime": "2025/01/14",
      "caseNo": "2025011400001",
      "idNo": "A163479793",
      "applyOption": "F",

    },
    {
      "applyTime": "2025/03/21",
      "caseNo": "2025031100104",
      "idNo": "A184385581",
      "applyOption": "FO",
    },
    {
      "applyTime": "2025/11/15",
      "caseNo": "2025011400002",
      "idNo": "A127944600",
      "applyOption": "FO",

    },
    {
      "applyTime": "2025/05/14",
      "caseNo": "2025011400001",
      "idNo": "A163479793",
      "applyOption": "F",

    },
  ];
  @Input() jsonFieldName: string[] = []; // JSON對應欄位
  @Input() displayColName: string[] = []; // 顯示用表頭
  @Input() CaseDatas: any[] = []; // 案件總筆數
  @Input() collapseBtn: boolean = true;
  @Input() size: number = 5; // 每頁顯示幾筆
  @Input() headerColumns: string[] = [
    'caseNo',
    "applyTime",
  ]; // 上排欄位定義
  @Input() detailsColumns: string[] = [
    "idNo",
    'applyOption'
  ]; // 下排欄位定義
  @Input() routerLinks: string = ''; //url

  @Output() btnClick = new EventEmitter();

  // 內部變數
  isCollapsed: boolean = false; // 表格收合控制
  paginatedItems: any[] = []; // 分頁顯示資料集合
  searchBtn: string = 'A'; // 查詢按鈕樣式
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  maxPage: number = 0; // 最大頁數
  pageInput: number = 1; // 輸入第幾頁
  paginator!: MatPaginator; // 分頁控制器

  @ViewChild(MatTable, { static: true }) dataTable?: MatTable<Element>;
  @ViewChild('paginator') set paginatorSetter(paginator: MatPaginator) {
    if (paginator) {
      this.paginator = paginator;
      paginator.page.subscribe((event: PageEvent) => this.onPageChange(event));
    }
  }

  private rulerSubscription: Subscription;
  constructor(private router: Router, private ruler: ViewportRuler,) {
    this.rulerSubscription = this.ruler.change(100).subscribe((data) => {
        // console.log(data)
        const size = this.ruler.getViewportSize();
        // console.log('Viewport size changed:', size);
    });
  }

  ngOnInit(): void {
    this.setPaginatedItems(0, this.size); //初始化顯示資料筆數
    this.maxPage = Math.ceil(this.elementData.length / this.size);// 計算最大頁數
  }

  // 詳情頁面
  clk(event: MouseEvent, data: any) {
    event.stopPropagation();
    this.btnClick.emit(data);
  }

  // 顯示多少筆數
  setPaginatedItems(startIndex: number, endIndex: number) {
    this.paginatedItems = this.elementData.slice(startIndex, endIndex);
  }

  // 頁數有變化時
  onPageChange(event: PageEvent) {
    this.pageInput = event.pageIndex + 1;
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.setPaginatedItems(startIndex, endIndex);
  }

  // 輸入頁數後
  jumpToPage() {
    if (this.pageInput < 1 || this.pageInput > this.maxPage) {
      alert(`請輸入 1 到 ${this.maxPage} 之間的頁碼`);
      this.pageInput = 1;
      this.setPaginatedItems(0, this.size);
      return;
    }

    // 將頁碼轉換為索引
    const pageIndex = this.pageInput - 1;
    this.paginator.pageIndex = pageIndex;
  }
  // sortData(sort: Sort) {
  //   const data = this.paginatedItems;

  //   if (!sort.active || sort.direction === '') {
  //     this.paginatedItems = data;
  //     return;
  //   }

  //   this.paginatedItems = data.sort((a: any, b: any) => {
  //     const isAsc = sort.direction === 'asc';
  //     const key = sort.active as keyof typeof a;

  //     return this.compare(a[key], b[key], isAsc);
  //   });

  //   console.log('this.paginatedItems',data)
  // }

  // private compare(a: string , b: string, isAsc: boolean): number {
  //   if (typeof a === 'string' && typeof b === 'string') {
  //     return (a.toLowerCase() < b.toLowerCase() ? -1 : 1) * (isAsc ? 1 : -1);
  //   }
  //   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  // }
  
  onSort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.paginatedItems = this.sortData(this.paginatedItems, this.sortColumn, this.sortDirection);
  }

  private sortData<T>(data: T[], column: string, direction: 'asc' | 'desc'): T[] {
    return data.sort((a, b) => {
      const valueA = this.getValue(a, column);
      const valueB = this.getValue(b, column);
      return this.compare(valueA, valueB, direction === 'asc');
    });
  }

  private compare(a: string | number, b: string | number, isAsc: boolean): number {
    if (a == null && b == null) return 0;
    if (a == null) return isAsc ? -1 : 1;
    if (b == null) return isAsc ? 1 : -1;
    return (a < b ? -1 : a > b ? 1 : 0) * (isAsc ? 1 : -1);
  }

  private getValue<T>(item: T, key: string): any {
    return (item as any)[key];
  }

  ngAfterContentInit() {
    console.log(this.dataTable)
  }
}
