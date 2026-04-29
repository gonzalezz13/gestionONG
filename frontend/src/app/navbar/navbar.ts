import { Component, HostListener, ElementRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, UserInfo } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  dropdownOpen = false;
  user: UserInfo | null = null;

  constructor(private authService: AuthService, private elRef: ElementRef) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(u => this.user = u);
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (this.dropdownOpen && !this.elRef.nativeElement.querySelector('.perfil-wrapper')?.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }

  onLogout(): void {
    this.authService.logout();
    this.dropdownOpen = false;
  }

  getUserInitial(): string {
    return this.user?.name?.charAt(0)?.toUpperCase() || 'U';
  }
}
