import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-p-calendar',
  imports: [FormsModule, CommonModule],
  templateUrl: './p-calendar.component.html',
  styleUrls: ['./p-calendar.component.css']
})
export class PCalendarComponent {
  showCalendar = false;
  selectedDate: Date | null = null;
  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();
  weekDays: string[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  monthNames: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  dates: number[] = [];

  constructor() {
    this.generateCalendar(this.currentMonth, this.currentYear);
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar(this.currentMonth, this.currentYear);
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar(this.currentMonth, this.currentYear);
  }

  generateCalendar(month: number, year: number) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    this.dates = [];

    for (let i = 0; i < firstDay; i++) {
      this.dates.push(0); // Empty dates for padding
    }

    for (let i = 1; i <= daysInMonth; i++) {
      this.dates.push(i);
    }
  }

  selectDate(date: number) {
    if (date !== 0) {
      this.selectedDate = new Date(this.currentYear, this.currentMonth, date);
      this.showCalendar = false;
    }
  }
}
