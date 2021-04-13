import {Component, OnInit} from '@angular/core';
import {StatusService} from '../services/status.service';
import {ColumnApi, GridApi} from 'ag-grid-community';
import * as moment from 'moment';
import {IStatistics} from '../interfaces/interfaces';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  gridApi: GridApi;
  gridColumnApi: ColumnApi;


  columnDefs = [
    {headerName: '', valueGetter: 'node.rowIndex + 1', width: 70, resizable: true},
    {headerName: 'שם אורח', field: 'name', resizable: true, filter: 'agTextColumnFilter', sortable: true},
    {headerName: 'ברוטו', field: 'amountOfInvited', width: 125, resizable: true, filter: 'agNumberColumnFilter', sortable: true},
    {headerName: 'נטו', field: 'amountOfGuests', width: 100, resizable: true, filter: 'agNumberColumnFilter', sortable: true},
    {headerName: 'מגיעים?', field: 'willArrive', width: 135, resizable: true, filter: 'agTextColumnFilter', sortable: true},
    {headerName: 'הערה', field: 'message', resizable: true, filter: 'agTextColumnFilter', sortable: true},
    {headerName: 'ביקורים', field: 'visits', width: 140, resizable: true, filter: 'agNumberColumnFilter', sortable: true},
    {
      headerName: 'זמן עדכון',
      field: 'updatedAt',
      resizable: true,
      filter: 'agDateColumnFilter',
      sortable: true,
      width: 200,
      cellRenderer: (data) => {
        if (data.value) {
          return moment(data.value).format('DD/MM/YYYY HH:mm');
        } else {
          return null;
        }
      }
    },
    {headerName: 'נייד', field: 'phoneNumber', width: 160, resizable: true, filter: 'agNumberColumnFilter', sortable: true},
    {
      field: 'עדכון', width: 130, cellRenderer: (params) => {
        const url = `https://lm-wedding.netlify.app/guest/${params?.data?._id}`;
        return `<a href=${url} target="_blank" rel="noopener">עדכון</a>`;
      }
    }
  ];

  rowData = [];
  statistics: IStatistics;

  constructor(private statusService: StatusService) {
  }

  ngOnInit(): void {
    this.statusService.getCurrentStatus().subscribe(guests => {
      this.rowData = guests;
    });

    this.statusService.getStatistics().subscribe(statistics => {
      this.statistics = statistics;
    });
  }

  onGridReady(params): void {
    this.gridColumnApi = params.columnApi;
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  getContextMenuItems(): any {
    return [
      {
        name: 'Tony',
        action: () => {
          console.log('Tony was pressed');
        },
      },
      'copy',
      'copyWithHeaders',
      'export'
    ];
  }

  getCurrentTime(): string {
    return moment().format('DD/MM/YYYY HH:mm').toString();
  }

  downloadCsv(): any {
    this.statusService.downloadCsv().subscribe(data => {
      const blob = new Blob([data.body], {type: 'text/csv'});
      FileSaver.saveAs(blob, `guests.csv`);

      // const blob = new Blob([data.body], {type: 'text/csv'});
      // const url = window.URL.createObjectURL(blob);
      // window.open(url);
      // console.log(data);
      // });
    });
  }
}
