import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { ProgressBarModule } from 'primeng/progressbar';
import { getUserInfo, userInfo } from '../../../models/user';
import { DialogModule } from 'primeng/dialog';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-user',
  templateUrl: 'user.component.html',
  styleUrl: 'user.component.css',
  standalone: true,
  imports: [
    TableModule,
    TagModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    HttpClientModule,
    CommonModule,
    MultiSelectModule,
    InputTextModule,
    DropdownModule,
    SliderModule,
    ProgressBarModule,
    DialogModule,
    FormsModule,
  ],
  styles: [
    `
      :host ::ng-deep {
        .p-paginator {
          .p-paginator-current {
            margin-left: auto;
          }
        }

        .p-progressbar {
          height: 0.5rem;
          background-color: #d8dadc;

          .p-progressbar-value {
            background-color: #607d8b;
          }
        }

        .table-header {
          display: flex;
          justify-content: space-between;
        }

        .p-calendar .p-datepicker {
          min-width: 25rem;

          td {
            font-weight: 400;
          }
        }

        .p-datatable.p-datatable-customers {
          .p-datatable-header {
            padding: 1rem;
            text-align: left;
            font-size: 1.5rem;
          }

          .p-paginator {
            padding: 1rem;
          }

          .p-datatable-thead > tr > th {
            text-align: left;
          }

          .p-datatable-tbody > tr > td {
            cursor: auto;
          }

          .p-dropdown-label:not(.p-placeholder) {
            text-transform: uppercase;
          }
        }

        .p-w-100 {
          width: 100%;
        }

        /* Responsive */
        .p-datatable-customers .p-datatable-tbody > tr > td .p-column-title {
          display: none;
        }
      }

      @media screen and (max-width: 960px) {
        :host ::ng-deep {
          .p-datatable {
            &.p-datatable-customers {
              .p-datatable-thead > tr > th,
              .p-datatable-tfoot > tr > td {
                display: none !important;
              }

              .p-datatable-tbody > tr {
                border-bottom: 1px solid var(--layer-2);

                > td {
                  text-align: left;
                  width: 100%;
                  display: flex;
                  align-items: center;
                  border: 0 none;

                  .p-column-title {
                    min-width: 30%;
                    display: inline-block;
                    font-weight: bold;
                  }

                  p-progressbar {
                    width: 100%;
                  }

                  &:last-child {
                    border-bottom: 1px solid var(--surface-d);
                  }
                }
              }
            }
          }
        }
      }

      ::ng-deep .p-splitter-panel-nested {
        display: unset;
      }
    `,
  ],
})
export class TableCustomersComponent implements OnInit {
  selectedUser: userInfo | null = null;
  dialogVisible: boolean = false;
  customers: userInfo[];
  selectedCustomers!: userInfo[];
  constructor() {}

  ngOnInit() {
    this.customers = getUserInfo.users;
  }

  showUserDialog(user: userInfo) {
    this.selectedUser = { ...user };
    this.dialogVisible = true;
  }

  closeDialog() {
    this.dialogVisible = false;
    this.selectedUser = null;
  }

  saveUser() {
    // Logic to save the user data
    console.log('User data saved:', this.selectedUser);
    this.closeDialog();
  }
}
