import { Component } from '@angular/core';

// Контакт в справочнике
interface Contact {
  name: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage {

  newItem: Contact = {
    name: '',
    email: '',
    phone: ''
  };

  dataSource: Contact[] = [
    { name: 'Филипп Абрамцев', email: 'cool-email@yandex.ru', phone: '+7(343)342-23-12' },
    { name: 'Шура Карликов', email: 'just-email@yandex.ru', phone: '+7(999)991-91-91' }
  ];

  isFormValid(): boolean {
    if (this.newItem.name.trim() === '' || this.newItem.name.length < 3 || 
      this.newItem.email.trim() === '' || 
      this.newItem.phone.trim() === '') {
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/;
	
    return emailRegex.test(this.newItem.email) && 
        phoneRegex.test(this.newItem.phone);
  }

  addRow(): void {
    if (!this.isFormValid()) {
      return;
	}
	
    this.dataSource.push({ ...this.newItem });
    this.newItem = { name: '', email: '', phone: '' };

    console.log('Добавлена запись:', this.dataSource[this.dataSource.length - 1]);
  }

  deleteRow(index: number): void {
    const deleted = this.dataSource[index];
    this.dataSource.splice(index, 1);
	
    console.log('Удалена запись:', deleted);
  }
}
