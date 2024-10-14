import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { GenerateTestProductList, ProductInfo } from '../../../models/product';
import { Category, getCategory } from '../../../models/category';
import { getSize, Size } from '../../../models/size';
import { Color, getColor } from '../../../models/color';

@Component({
    selector: 'table-products-demo',
    templateUrl: 'warehouse.component.html',
    standalone: true,
    imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule,CheckboxModule],
    providers: [MessageService, ConfirmationService],
    styleUrl: './warehouse.component.scss'
})
export class CategoryTableAdminComponent implements OnInit{
    products: ProductInfo[];
    product: ProductInfo;
    categories: Category[];
    sizes: Size[];
    colors: Color[];
    selectedProducts!: ProductInfo[] | null;
    submitted: boolean = false;
    productDialog: boolean = false;


    constructor(private messageService: MessageService, private confirmationService: ConfirmationService) {}
    ngOnInit() {
        //Lấy danh sách product => thay bằng API 
        this.products = GenerateTestProductList.products;
        //Lấy category
        this.categories = getCategory.categories;
        //Lấy size
        this.sizes = getSize.sizes;
        //Lấy Color
        this.colors = getColor.colors;
    }

    //Mở cửa số thêm sản phẩm
    openNew() {
        
    };

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                //Lọc ra những sản phẩm không được chọn => Kết quả là 1 bảng không chứa các sản phẩm được chọn
                this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
                this.selectedProducts = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            }
        });
    }

    //Xoas san pham
    deleteProduct(product: ProductInfo) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter((val) => val.id !== product.id);
                this.product = { 
                    id: 0,
                    name: '',
                    price: 0,
                    description: '',
                    discount: 0,
                    slug: '',
                    category: '',
                    size : '',
                    colorCode : '',
                    amount: 0
                }; 
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            }
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    editProduct(product: ProductInfo) {
        this.product = { ...product };
        this.productDialog = true;
    }


    //Luwu product
    saveProduct() {
        this.submitted = true;
        
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }  
}