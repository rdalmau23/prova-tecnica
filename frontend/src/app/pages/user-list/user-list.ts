import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';

  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  totalUsers: number = 0;

  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.currentPage = 1;
      this.filterUsers();
    });
  }
  goToProfile(userId: string) {
    this.router.navigate(['/profile', userId]);
  }

  sortBy(column: string) {
  if (this.sortColumn === column) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortColumn = column;
    this.sortDirection = 'asc';
  }
    this.filterUsers();
  }

  filterUsers(): void {
  const term = this.searchTerm.trim().toLowerCase();
  let filtered = this.users;
  if (term) {
    filtered = this.users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.surname.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      (user.id ? user.id.toLowerCase().includes(term) : false)
    );
  }

  // Ordenació
  if (this.sortColumn) {
    filtered = filtered.sort((a, b) => {
      const aValue = (a as any)[this.sortColumn]?.toLowerCase?.() ?? '';
      const bValue = (b as any)[this.sortColumn]?.toLowerCase?.() ?? '';
      if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  this.totalUsers = filtered.length;
  this.totalPages = Math.ceil(this.totalUsers / this.pageSize) || 1;
  this.currentPage = Math.min(this.currentPage, this.totalPages);
  this.filteredUsers = filtered.slice(
    (this.currentPage - 1) * this.pageSize,
    this.currentPage * this.pageSize
  );
}

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.filterUsers();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filterUsers();
    }
  }

  downloadExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.filteredUsers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuaris');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'usuaris.xlsx');
  }

  downloadPDF(): void {
    const doc = new jsPDF();
    const tableData = this.filteredUsers.map(user => [user.name, user.surname, user.email, user.id]);

    autoTable(doc, {
      head: [['Nom', 'Cognoms', 'Email', 'DNI']],
      body: tableData,
    });

    doc.save('usuaris.pdf');
  }
}