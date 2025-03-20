import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

// 改變分頁器文字
@Injectable() class CustomMatPaginatorIntl extends MatPaginatorIntl {
  itemsPerPageLabel = '筆數/頁';
}

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.css'],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }]
})

export class MatTableComponent implements OnInit {
  items = [
    {
      applyDate: '2024/07/04',
      releaseDate: '2024/07/08',
      caseNumber: 'DA2023070700011',
      companyId: '20883992',
      orgType: '獨資',
      responsiblePerson: '劉大天',
      idNumber: 'A155157528',
      videoVerification: '通過',
      cabinetVerification: '否',
      applicationItem: '臺外幣',
      caseStatus: '副理-放行'
    },
    {
      applyDate: '2024/07/05',
      releaseDate: '2024/07/09',
      caseNumber: 'DA2023070700012',
      companyId: '20983743',
      orgType: '有限公司',
      responsiblePerson: '張三',
      idNumber: 'A123456789',
      videoVerification: '通過',
      cabinetVerification: '是',
      applicationItem: '信用貸款',
      caseStatus: '核准'
    },
    {
      applyDate: '2024/07/06',
      releaseDate: '2024/07/10',
      caseNumber: 'DA2023070700013',
      companyId: '20765431',
      orgType: '股份有限公司',
      responsiblePerson: '李四',
      idNumber: 'A987654321',
      videoVerification: '未通過',
      cabinetVerification: '否',
      applicationItem: '房貸',
      caseStatus: '審核中'
    },
    {
      applyDate: '2024/07/07',
      releaseDate: '2024/07/11',
      caseNumber: 'DA2023070700014',
      companyId: '20654321',
      orgType: '獨資',
      responsiblePerson: '王五',
      idNumber: 'A112233445',
      videoVerification: '通過',
      cabinetVerification: '是',
      applicationItem: '車貸',
      caseStatus: '放行'
    },
    {
      applyDate: '2024/07/08',
      releaseDate: '2024/07/12',
      caseNumber: 'DA2023070700015',
      companyId: '20543210',
      orgType: '合夥',
      responsiblePerson: '陳六',
      idNumber: 'A556677889',
      videoVerification: '通過',
      cabinetVerification: '否',
      applicationItem: '商業貸款',
      caseStatus: '待補件'
    },
    {
      applyDate: '2024/07/09',
      releaseDate: '2024/07/13',
      caseNumber: 'DA2023070700016',
      companyId: '20432109',
      orgType: '有限公司',
      responsiblePerson: '林七',
      idNumber: 'A998877665',
      videoVerification: '未通過',
      cabinetVerification: '是',
      applicationItem: '信用貸款',
      caseStatus: '撤件'
    },
    {
      applyDate: '2024/07/10',
      releaseDate: '2024/07/14',
      caseNumber: 'DA2023070700017',
      companyId: '20321098',
      orgType: '股份有限公司',
      responsiblePerson: '蔡八',
      idNumber: 'A334455667',
      videoVerification: '通過',
      cabinetVerification: '否',
      applicationItem: '房貸',
      caseStatus: '審核中'
    },
    {
      applyDate: '2024/07/11',
      releaseDate: '2024/07/15',
      caseNumber: 'DA2023070700018',
      companyId: '20210987',
      orgType: '獨資',
      responsiblePerson: '孫九',
      idNumber: 'A776655443',
      videoVerification: '通過',
      cabinetVerification: '是',
      applicationItem: '車貸',
      caseStatus: '放行'
    },
    {
      applyDate: '2024/07/12',
      releaseDate: '2024/07/16',
      caseNumber: 'DA2023070700019',
      companyId: '20109876',
      orgType: '合夥',
      responsiblePerson: '周十',
      idNumber: 'A665544332',
      videoVerification: '未通過',
      cabinetVerification: '否',
      applicationItem: '商業貸款',
      caseStatus: '待補件'
    },
    {
      applyDate: '2024/07/13',
      releaseDate: '2024/07/17',
      caseNumber: 'DA2023070700020',
      companyId: '20098765',
      orgType: '有限公司',
      responsiblePerson: '吳十一',
      idNumber: 'A554433221',
      videoVerification: '通過',
      cabinetVerification: '是',
      applicationItem: '信用貸款',
      caseStatus: '核准'
    }
  ];

  maxPage: number = 0; // 最大頁數
  // 上排欄位定義
  headerColumns = [
    { key: 'onlineDate', label: '線上申請日期' },
    { key: 'releaseDate', label: '放行日期' },
    { key: 'caseNumber', label: '案件編號' },
    { key: 'companyId', label: '公司統編' },
    { key: 'organizationType', label: '組織型態' },
    { key: 'responsiblePerson', label: '負責人' },
    { key: 'function', label: '功能' }
  ];

  // 下排欄位定義
  detailsColumns = [
    { key: 'taxId', label: '統編' },
    { key: 'videoStatus', label: '視訊驗證狀態' },
    { key: 'areaCheck', label: '臨櫃驗證' },
    { key: 'applicationItem', label: '申請項目' },
    { key: 'caseStatus', label: '案件狀態' }
  ];

  paginatedItems: any[] = [];
  allExpanded = false; // 控制展開或收合

  size: number = 2
  pageInput: number = 1;
  paginator!: MatPaginator;

  ngOnInit() {
    // 初始化筆數顯示
    this.setPaginatedItems(0, this.size);

    // 計算最大頁數
    this.maxPage = Math.ceil(this.items.length / this.size);
  }

  @ViewChild('paginator') set paginatorSetter(paginator: MatPaginator) {
    if (paginator) {
      this.paginator = paginator;
      paginator.page.subscribe((event: PageEvent) => this.onPageChange(event));
    }
  }
  setPaginatedItems(startIndex: number, endIndex: number) {
    this.paginatedItems = this.items.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    // console.log('1', event)
    // 更新輸入框中的頁碼
    this.pageInput = event.pageIndex + 1;
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.setPaginatedItems(startIndex, endIndex);
  }

  jumpToPage() {
    if (this.pageInput < 1 || this.pageInput > this.maxPage) {
      alert(`請輸入 1 到 ${this.maxPage} 之間的頁碼`);
      return;
    }

    // 將頁碼轉換為索引
    const pageIndex = this.pageInput - 1;
    this.paginator.pageIndex = pageIndex;
  }

  clk(event: MouseEvent) {
    event.stopPropagation();
  }

}
