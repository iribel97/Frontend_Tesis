import {Component, Input, TemplateRef} from '@angular/core';
import {NgClass, NgForOf, NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'ui-tabs',
  imports: [
    NgForOf,
    NgTemplateOutlet,
    NgClass
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent {
  @Input() tabs: { title: string; id: string; content: TemplateRef<any> }[] = [];
  selectedTab = 0;

  selectTab(index: number): void {
    this.selectedTab = index;
  }
}
