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
import { GenerateTestProductList,  ProductInfo } from '../../../models/product';
import { Categories, category } from '../../../models/category';
import { sizeList, Sizes } from '../../../models/size';
import { colors, getColor, getColors } from '../../../models/color';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
    selector: 'table-products-demo',
    templateUrl: 'category-admin.component.html',
    standalone: true,
    imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule,CheckboxModule],
    providers: [MessageService, ConfirmationService],
    styleUrl: './category-admin.component.scss'
})
export class CategoryTableAdminComponent implements OnInit{
    cas: category[];
    sizes: sizeList[];
    colors: getColor[];
    products!: ProductInfo[];
    //Sản phẩm
    product!: ProductInfo;
    //Sản phẩm được chọn
    selectedProducts!: ProductInfo[] | null;
    submitted: boolean = false;
    productDialog: boolean = false;


    constructor(private messageService: MessageService, private confirmationService: ConfirmationService) {}
    ngOnInit() {
        //Lấy danh sách product => thay bằng API 
        this.products = GenerateTestProductList.productList;
        //Lấy ra toàn bộ category => thay bằng từ csdl
        this.cas = Categories.categories;
        //Lấy ra toàn bộ size => ha bằng lấy từ csdl
        this.sizes = Sizes.sizes;
        //Lấy ra toàn bộ màu => tha bằng lấy từ csdl
        this.colors = getColors.getColors;
    }

    openNew() {
        this.product = { id: 0,
            name: '',
            price: 0,
            description: '',
            discount: 0,
            slug: '',
            category: '',
            size : '',
            colors : []
        }  
        // this.submitted = false;
        this.productDialog = true;          
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

    deleteProduct(product: ProductInfo) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter((val) => val.id !== product.id);
                this.product = { id: 0,
                    name: '',
                    price: 0,
                    description: '',
                    discount: 0,
                    slug: '',
                    category: '',
                    size : '',
                    colors : []
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

    saveProduct() {
        this.submitted = true;

        if (this.product.name?.trim()) {
            if (this.product.id) {
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.product.colors[0].imageUrls[0].imageUrl = 'product-placeholder.svg';
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = { id: 0,
                name: '',
                price: 0,
                description: '',
                discount: 0,
                slug: '',
                category: '',
                size : '',
                colors : []
            } 
        }
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