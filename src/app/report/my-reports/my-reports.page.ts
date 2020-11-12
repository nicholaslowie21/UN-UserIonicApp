import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-my-reports',
  templateUrl: './my-reports.page.html',
  styleUrls: ['./my-reports.page.scss'],
})
export class MyReportsPage implements OnInit {
  currentUser: any;
  accountType: any;
  accountBoolean: boolean;
  isVerified: boolean;
  pendingReports: any;
  progressReports: any;
  solvedReports: any;
  declinedReports: any;
  type: any;

  constructor(private tokenStorage: TokenStorageService, private reportService: ReportService) {
    this.currentUser = this.tokenStorage.getUser();
    this.type="pending";
   this.accountType = this.tokenStorage.getAccountType();
   console.log(this.accountType);
    if(this.accountType == "institution") {
      this.accountBoolean = true;
      if(this.currentUser.data.user.isVerified == true) {
        this.isVerified = true;
      }
    } else if(this.accountType == "user") {
      if(this.currentUser.data.user.isVerified == "true") {
        this.isVerified = true;
      }
      this.accountBoolean = false;
    }
   }

  ngOnInit() {
    this.type="pending";
    this.initialise();
  }

  initialise() {
    this.reportService.viewPendingReport().subscribe((res) => {
      this.pendingReports = res.data.reports;
      this.reportService.viewProgressReport().subscribe((res) => {
        this.progressReports = res.data.reports;
        this.reportService.viewSolvedReport().subscribe((res) => {
          this.solvedReports = res.data.reports;
          this.reportService.viewDeclinedReport().subscribe((res) => {
            this.declinedReports = res.data.reports;
          }, (err) => {
            console.log("Retrieve declined report error: " + err.error.msg)
          })
        }, (err) => {
          console.log("Retrieve solved report error: " + err.error.msg)
        })
      }, (err) => {
        console.log("Retrieve progress report error: " + err.error.msg)
      })
      console.log(res.data.reports);
    }, (err) => {
      console.log("Retrieve pending report error: " + err.error.msg)
    })

    

    

    

  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  formatDate(date): any {
    let formattedDate = new Date(date).toUTCString();
    return formattedDate.substring(0, formattedDate.length-3);
  }

}
