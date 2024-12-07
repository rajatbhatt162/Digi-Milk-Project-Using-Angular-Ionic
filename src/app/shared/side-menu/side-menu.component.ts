import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  isDropdown?: boolean;
  isDropdownOpen?: boolean; // To track dropdown state
  key?: string;
  subMenuItems?: MenuItem[]; // Submenu items for dropdowns
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  @Input() menuItems: MenuItem[] = [];
  public filteredMenuItems: MenuItem[] = [];
  public searchQuery: string = '';
  public showMenuBar = true;
  public isLoginPage = false;

  constructor(private router: Router, private authService: AuthService) {
    // Watch for route changes to hide/show the menu bar
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = ['/login', '/forgot-pwd', '/register'].includes(
          this.router.url
        );
        this.showMenuBar = !this.isLoginPage;
      }
    });
  }

  ngOnInit(): void {
    this.menuItems = [
      { label: 'Dashboard', route: '/dashboard', icon: 'home' },
      { label: 'Roles & Permissions', route: '/roles-permissions', icon: 'apps' },
      { label: 'User', route: '/user', icon: 'pie-chart' },
      { label: 'Masters', icon: 'list', isDropdown: true, key: 'masters' },
      { label: 'Milk Collection', route: '/milk-collection', icon: 'briefcase' },
      { label: 'Society Milk Collection', route: '/society-milk-collection', icon: 'briefcase' },
      { label: 'Farmer Demand', icon: 'leaf', isDropdown: true, key: 'farmerDemand' },
      { label: 'Queries', route: '/queries', icon: 'chatbubbles' },
      { label: 'Payments', route: '/payments', icon: 'wallet' },
      { label: 'Product', route: '/products', icon: 'bag-handle' },
      { label: 'Society Sales', route: '/society-sales', icon: 'ribbon' },
      { label: 'Reports', icon: 'document', isDropdown: true, key: 'reports' },
      { label: 'Society Demands', route: '/society-demands', icon: 'cart' },
      { label: 'Broadcast Message', icon: 'chatbox-ellipses', isDropdown: true, key: 'broadcastMessage' },
      { label: 'Settings', route: '/settings', icon: 'settings' }
    ];

    // Dropdown menu items
    this.menuItems.forEach((item) => {
      if (item.isDropdown) {
        switch (item.key) {
          case 'masters':
            item.subMenuItems = [
              { label: 'Milk Types', route: '/milk-types', icon: '' },
              { label: 'Product Type', route: '/masters/pro-type', icon: '' },
              { label: 'Product', route: '/product', icon: '' },
              { label: 'Shift', route: '/masters/shift', icon: '' },
              { label: 'Rate-Chart', route: '/masters/rate-chart', icon: '' },
              { label: 'Farmer Loan Details', route: '/masters/farmer-loan-detail', icon: '' },
              { label: 'Farmer RD Details', route: '/masters/farmer-rd-details', icon: '' },
              { label: 'Router Master', route: '/masters/route-master', icon: '' },
              { label: 'Set Min SNF FAT', route: '/masters/set-min-snf-fat', icon: '' },
              { label: 'Settle Payments', route: '/masters/settle-pay', icon: '' },
              { label: 'Manage Week', route: '/masters/manage-week', icon: '' }
            ];
            break;

          case 'farmerDemand':
            item.subMenuItems = [
              { label: 'Product Demand', route: '/farmer-demand/pro-demand', icon: '' },
              { label: 'Doctors Demand', route: '/farmer-demand/dr-demand', icon: '' },
            ];
            break;

          case 'reports':
            item.subMenuItems = [
              { label: 'Union', route: '/reports/union', icon: 'ellipse' },
              { label: 'Supervisor Master', route: '/reports/supervisor-master', icon: 'ellipse' },
            ];
            break;

          case 'broadcastMessage':
            item.subMenuItems = [

              { label: 'Screen Message', route: '/broadcast-message/screen-msg', icon: '' },
              { label: 'Farmer Screen Message', route: '/broadcast-message/farmer-screen-msg', icon: '' }
            ];
            break;
        }
      }
    });

    this.filteredMenuItems = this.menuItems;
  }

  // Closes the menu
  closeMenu() {
    const menu = document.querySelector('ion-menu');
    if (menu) {
      menu.close();
    }
  }

  // Navigate to a route
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  // Check if the current route is active
  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

  // Toggle the dropdown open/close
  toggleDropdown(menuItem: MenuItem) {
    // Close all other dropdowns
    this.menuItems.forEach((item) => {
      if (item.isDropdown && item !== menuItem) {
        item.isDropdownOpen = false;
      }
    });

    // Toggle the clicked dropdown
    menuItem.isDropdownOpen = !menuItem.isDropdownOpen;
  }


  // Perform a search and filter menu items
  performSearch() {
    const query = this.searchQuery.toLowerCase();
    this.filteredMenuItems = this.menuItems.filter((item) => {
      if (item.label.toLowerCase().includes(query)) {
        return true;
      }
      if (item.isDropdown && item.subMenuItems) {
        return item.subMenuItems.some((subItem) =>
          subItem.label.toLowerCase().includes(query)
        );
      }
      return false;
    });
  }
}
