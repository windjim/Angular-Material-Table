import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-table',
  template: `
    <div class="mb-6">
      <button (click)="toggleExpandAll()" class="toggle-btn">
        {{ allExpanded ? '全部收合' : '全部展開' }}
      </button>

      <div *ngFor="let item of dataSource.data" class="table-container">
        <table mat-table [dataSource]="[item]" class="mat-table">
          <ng-container *ngFor="let column of displayedColumns" [matColumnDef]="column.fieldName">
            <th mat-header-cell *matHeaderCellDef (click)="onSort(column.fieldName)" class="mat-header-cell">
              {{ column?.displayName }}
              <span *ngIf="sortColumn === column.fieldName">
                {{ sortDirection === 'asc' ? '⬆️' : '⬇️' }}
              </span>
            </th>
            <td mat-cell *matCellDef="let element" class="mat-cell">
              {{element|jsonKey:column.fieldName}}
            </td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="columnFieldNames"></tr>
          <tr mat-row *matRowDef="let row; columns: columnFieldNames;"></tr>
        </table>

        <div [@expandCollapse]="item.expanded ? 'expanded' : 'collapsed'" class="detail-section">
          <p class="text-gray-700 font-semibold mb-2">詳細資料:</p>
          <pre class="detail-json">{{ item | json }}</pre>
        </div>
      </div>
    </div>
  `,
  styleUrls:['table.component.css'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0px',
        overflow: 'hidden',
        opacity: 0,
        padding: '0 1rem'
      })),
      state('expanded', style({
        height: '*',
        overflow: 'auto',
        opacity: 1,
        padding: '1rem'
      })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out')),
    ])
  ]
})
export class TableComponent {
  get columnFieldNames(): string[] {
    return this.displayedColumns.map(c => c.fieldName);
  }

  displayedColumns = [
    { fieldName: 'caseNo', displayName: '案件編號', sortable: false },
    { fieldName: 'applyTime', displayName: '申請日期', sortable: false },
    { fieldName: 'vsDate', displayName: '完成視訊日期', sortable: false },
    { fieldName: 'uniNo', displayName: '公司統編', sortable: false },
    { fieldName: 'companyName', displayName: '公司名稱', sortable: false },
    { fieldName: 'name', displayName: '負責人', sortable: false },
    { fieldName: 'idNo', displayName: '身份證字號', sortable: false },
    { fieldName: 'btn', displayName: '功能', sortable: false }
  ];

  dataSource = new MatTableDataSource([
    {
      applyTime: '2025/01/14',
      caseNo: '2025011400001',
      uniNo: '95206663',
      companyName: '懷德紅茶店',
      name: '蔡哥',
      idNo: 'A163479793',
      expanded: false,
    },
    {
      applyTime: '2025/01/23',
      caseNo: '2025012300009',
      uniNo: '89963035',
      companyName: '傳揚行銷廣告股份有限公司',
      name: '哥吉拉',
      idNo: 'A185707698',
      expanded: false,
    },
    {
      applyTime: '2025/01/23',
      caseNo: '2025012300001',
      uniNo: '89913031',
      companyName: '獵人行銷廣告股份有限公司',
      name: '雷歐力',
      idNo: 'A185707698',
      expanded: false,
    }
  ]);

  allExpanded = false;
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  toggleExpandAll() {
    this.allExpanded = !this.allExpanded;
    this.dataSource.data.forEach(item => item.expanded = this.allExpanded);
  }

  onSort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.dataSource.data = this.sortData(this.dataSource.data, this.sortColumn, this.sortDirection);
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
}
