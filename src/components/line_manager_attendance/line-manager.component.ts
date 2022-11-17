import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../attendance.service';

@Component({
  selector: 'app-line-manager',
  templateUrl: './line-manager.component.html',
  styleUrls: ['./line-manager.component.css']
})
export class LineManagerComponent implements OnInit {
  monthArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  monthObj: any = {};
  correctionStatus={
    type :'lm-Correction-Status',

  }
  correctionApplication={
    type :'lm-Correction-Applicaitons',

  }
  empForm={
    type :'lm-form',
    ComponenttypeId:3
  }
  constructor(private attendanceService:AttendanceService) { }

  ngOnInit(): void {
    this.setCurrentMonth();
  }
  setCurrentMonth() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    this.monthObj.currentMonth = month;
    // to handle last/first month
    if (this.monthObj.currentMonth == 11) {
      this.monthObj.nextMonth = 0;
      this.monthObj.previousMonth = 10;
      this.monthObj.nextYear = year + 1;
      this.monthObj.lastYear = year;
      this.monthObj.year = +year;
     this.attendanceService.setHrCorrectionStatusMetaData(`&fiscal_year=${this.monthObj.year}-${this.monthObj.currentMonth}`);
      return;
    } else if (this.monthObj.currentMonth == 0) {
      this.monthObj.nextMonth = 1;
      this.monthObj.previousMonth = 11;
      this.monthObj.lastYear = year - 1;
      this.monthObj.nextYear = year;
      this.monthObj.year = year;

      return;
    }
    //for  normal month
    this.monthObj.lastYear = year;
    this.monthObj.nextYear = year;
    this.monthObj.year = year;
    this.monthObj.previousMonth = month - 1;
    this.monthObj.nextMonth = month + 1;

  }
  previousMonth() {
    //to handle sepecial case
    if (this.monthObj.previousMonth == 0) {
      this.monthObj.lastYear = this.monthObj.lastYear - 1;
      this.monthObj.currentMonth = this.monthObj.currentMonth - 1;
      this.monthObj.previousMonth = 11;
      this.monthObj.nextMonth = this.monthObj.nextMonth - 1;
      this.attendanceService.setHrCorrectionStatusMetaData(`&fiscal_year=${this.monthObj.year}-${this.monthObj.currentMonth+1}`);
      return;
    } else if (this.monthObj.currentMonth == 0) {
      this.monthObj.year = this.monthObj.lastYear;
      this.monthObj.nextYear = this.monthObj.year + 1;
      this.monthObj.currentMonth = 11;
      this.monthObj.previousMonth = 10;
      this.monthObj.nextMonth = 0;
      this.attendanceService.setHrCorrectionStatusMetaData(`&fiscal_year=${this.monthObj.year}-${this.monthObj.currentMonth+1}`);
      return;
    } else if (this.monthObj.currentMonth == 11) {
      this.monthObj.nextYear = this.monthObj.year;
      this.monthObj.currentMonth = 10;
      this.monthObj.previousMonth = 9;
      this.monthObj.nextMonth = 11;
      this.attendanceService.setHrCorrectionStatusMetaData(`&fiscal_year=${this.monthObj.year}-${this.monthObj.currentMonth+1}`);
      return;
    }
    //for usual
    this.monthObj.currentMonth = this.monthObj.currentMonth - 1;
    this.monthObj.previousMonth = this.monthObj.previousMonth - 1;
    this.monthObj.nextMonth = this.monthObj.nextMonth - 1;
    this.attendanceService.setHrCorrectionStatusMetaData(`&fiscal_year=${this.monthObj.year}-${this.monthObj.currentMonth+1}`);
  }
  nextMonth() {
    //to handle sepecial case
    if (this.monthObj.currentMonth == 10) {
      this.monthObj.nextMonth = 0;
      this.monthObj.previousMonth = this.monthObj.previousMonth + 1;
      this.monthObj.currentMonth = this.monthObj.currentMonth + 1;
      this.monthObj.nextYear = this.monthObj.year + 1;
      this.attendanceService.setHrCorrectionStatusMetaData(`&fiscal_year=${this.monthObj.year}-${this.monthObj.currentMonth+1}`);
      return;
    } else if (this.monthObj.currentMonth == 11) {
      this.monthObj.currentMonth = 0;
      this.monthObj.previousMonth = this.monthObj.previousMonth + 1;
      this.monthObj.nextMonth = this.monthObj.nextMonth + 1;
      this.monthObj.year = this.monthObj.nextYear;
      this.attendanceService.setHrCorrectionStatusMetaData(`&fiscal_year=${this.monthObj.year}-${this.monthObj.currentMonth+1}`);
      return;
    } else if (this.monthObj.currentMonth == 0) {
      this.monthObj.previousMonth = 0;
      this.monthObj.currentMonth = this.monthObj.currentMonth + 1;
      this.monthObj.nextMonth = this.monthObj.nextMonth + 1;
      this.monthObj.lastYear = this.monthObj.year;
      this.attendanceService.setHrCorrectionStatusMetaData(`&fiscal_year=${this.monthObj.year}-${this.monthObj.currentMonth+1}`);
      return;
    }
    //for usual
    this.monthObj.currentMonth = this.monthObj.currentMonth + 1;
    this.monthObj.previousMonth = this.monthObj.previousMonth + 1;
    this.monthObj.nextMonth = this.monthObj.nextMonth + 1;
    this.attendanceService.setHrCorrectionStatusMetaData(`&fiscal_year=${this.monthObj.year}-${this.monthObj.currentMonth+1}`);
  }
}
