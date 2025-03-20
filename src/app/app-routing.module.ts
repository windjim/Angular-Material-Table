import { CanDeactivate, CanActivate } from '@angular/router';
// 官方元件
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';

// 新增自訂元件
import { TableComponent } from './table/table.component';
import { ExpansionTableComponent } from './expansion-table/expansion-table.component';

// 也可以設為變數
const routes: Routes = [
  {
    path: '',
    component: ExpansionTableComponent,
  },
  {
    path: 'table',
    component: TableComponent,
  },
  {
    path: 'expansion-table',
    component: ExpansionTableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
