import {booleanAttribute, Component, Input, numberAttribute} from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {AppConfigService} from "../../../../services/common/app-config.service";

@Component({
  selector: 'app-app-doc-api-table',
  imports: [],
  templateUrl: './app-doc-api-table.component.html'
})
export class AppDocApiTableComponent {
  @Input() id: string;
  @Input() label: string;
  @Input() data: any[];
  @Input() description: string;
  @Input() relatedProp: string;
  @Input() parentTitle: string;
  @Input() parentDescription: string;
  @Input() parentId: string;
  @Input({ transform: numberAttribute }) level: number;
  @Input({ transform: booleanAttribute }) isInterface: boolean;
  constructor(public router: Router, public location: Location, private configService: AppConfigService) {
    this.id = "";
    this.label = "";
    this.data = [];
    this.description = "";
    this.relatedProp = "";
    this.parentTitle = "";
    this.parentDescription = "";
    this.parentId = "";
    this.level = 0;
    this.isInterface = false;
  }

  get isDarkMode(): boolean {
    return this.configService.config().darkMode ?? true;
  }

  navigate(event: any, param: any): void {
    if (typeof window !== undefined) {
      const parentElement = event.currentTarget.parentElement;
      this.location.go(this.location.path() + '#' + this.id + '.' + param);

      setTimeout(() => {
        parentElement.scrollInView({ block: 'nearest', behavior: 'smooth' });
      }, 1);
      event.preventDefault();
    }
  }
  getKeys(object: any): string[] {
    return Object.keys(object);
  }
  getEntries(object: any): [string, any][] {
    return Object.entries(object);
  }
  getType(value: any) {
    if (this.label === 'Templates') {
      return value?.split('|');
    }
    if (this.label === 'Methods' && !value) {
      return ['-'];
    }
    return value?.split('|').map((item: any) => item.replace(/(\[|\]|<|>).*$/gm, '').trim());
  }
  isLinkType(value: any) {
    if (this.label === 'Templates') return false;
    const validValues = ['confirmationoptions', 'toastmessageoptions'];
    return value.toLowerCase().includes(this.id.split('.')[1].toLowerCase()) || validValues.includes(value.toLowerCase());
  }
  scrollToLinkedElement(event: any, value: any) {
    if (document && document.createElement !== undefined) {
      const section = this.label === 'Emitters' ? 'Events' : this.label;
      const elementId = `api.${this.id.split('.')[1].toLowerCase()}.${section.toLowerCase()}.${value}`;

      setTimeout(() => {
        this.scrollToLabelById(elementId);
      }, 1);

      event.preventDefault();
    }
  }

  scrollToLabelById(id: any) {
    if (typeof document !== undefined) {
      const label = document.getElementById(id);
      this.location.go(`${this.location.path()}/#${id}`);
      label && label.parentElement?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }
}
