import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {BreadcrumbService} from "../../services/breadcrumb.service";
import {NgClass} from "@angular/common";
import {ClickOutsideDirective} from "../../shared/directivas/click-outside.directive";

@Component({
    selector: 'app-principal',
    imports: [RouterOutlet, NgClass, ClickOutsideDirective],
    templateUrl: './principal.component.html',
    styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit {
    constructor(
        private breadcrumbService: BreadcrumbService) {
    }

    breadcrumb: string[] = [];
    isDropdownOpen = false;
    isSidebarOpen = false;

    ngOnInit() {
        this.breadcrumbService.breadcrumb$.subscribe(breadcrumb => {
            this.breadcrumb = breadcrumb;
        });
    }

    toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    openSidebar(event: Event) {
        event.stopPropagation();
        this.isSidebarOpen = true;
    }

    closeSidebar() {
        this.isSidebarOpen = false;
    }

    closeDropdown(event: Event) {
        if (!(event.target as HTMLElement).closest('#dropdown-account')) {
            this.isDropdownOpen = false;
        }
    }
}
