import { ChangeDetectorRef, Component, OnInit,Inject } from '@angular/core';
import { PaymentHistoryModel } from 'src/app/shared/models/payment-history.model';
import { RegionModel } from '../../shared/models/region.model';
import { ProjectModel } from '../../shared/models/project.model';
import { BaseResponse } from '../../../../../../libs/common-utils/src';
import { Router } from '@angular/router';
import { PaymentHistoryService } from 'src/app/shared/services/payment-history.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { finalize } from 'rxjs';
@Component({
  selector: 'one-portal-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.less'],
})
export class PaymentHistoryComponent implements OnInit {
  form = new FormGroup({
    date: new FormControl(''),
  });
  regionId: number;
  projectId: number;
  listOfpaymentHistory: PaymentHistoryModel[] = [];
  isBegin: Boolean = false;
  size = 10;
  index: number = 0;
  total: number;
  baseResponse: BaseResponse<PaymentHistoryModel[]>;
  eventLogID: any;
 status: number =0;
 ipAddress:string = '';
 loading:boolean = true;

  paymentData = ['Tất cả', 'Tạo mới', 'Sửa', 'Xóa'];
  constructor(private service: PaymentHistoryService, private router: Router, private cdr: ChangeDetectorRef,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,) {}



  ngOnInit(): void {
    this.getData();
  }

  ngOnChange(): void {}
  getData(): void {
    this.loading= true;
    this.service.getData(this.ipAddress, this.status, 669, this.regionId, this.size, this.index,true).pipe(
      finalize(()=>{
        this.loading = false;
        this.cdr.detectChanges();
      })
    ).subscribe(data=>{
      this.listOfpaymentHistory = data.records;
      this.total = data.totalCount;

    })
  
  }

  search(search: string) {
    console.log(search);
    
  }

  onRegionChange(region: RegionModel) {
    this.regionId = region.regionId;
    
  }

  projectChange(project: ProjectModel) {
   
  }

  onPageSizeChange(event: any) {
    
  }

  onPageIndexChange(event: any) {
   
  }
}
