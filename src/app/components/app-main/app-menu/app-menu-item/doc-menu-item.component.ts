import {booleanAttribute, Component, Input} from "@angular/core";
import {DocMenuItem} from "../../../../models/rest/doc/doc-menu-item";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {StyleClassModule} from "primeng/styleclass";
import {TagModule} from "primeng/tag";
import {UndoIcon} from "primeng/icons/undo";

@Component({
  selector: "[doc-menu-item]",
  standalone: true,
  imports: [
    NgIf,
    ButtonModule,
    StyleClassModule,
    NgClass,
    TagModule,
    RouterLink,
    RouterLinkActive,
    NgForOf
  ],
  templateUrl: "./doc-menu-item.component.html",
  styleUrl: "./doc-menu-item.component.scss"
})
export class DocMenuItemComponent {
  @Input() item?: DocMenuItem;
  @Input({ transform: booleanAttribute }) root: boolean;
  constructor(private router: Router) {
    this.root = true;
  }

  isActiveRootMenuItem(menuItem?: DocMenuItem): boolean {
    if (menuItem === undefined) {
      return false;
    }
    const url = this.router.url.split("#")[0];
    return menuItem.children !== undefined && !menuItem.children.some(item => item.routerLink === `${url}` ||
      (item.children && item.children.some(it => it.routerLink === `${url}`)));
  }
  canSlideDown(): boolean {
    if (!this.root) {
      return false;
    }
    if (this.item?.children?.length === undefined) {
      return false;
    }

    return this.item?.children?.length > 0;
  }
  haveChild(): boolean {
    if (this.root) {
      return false;
    }
    if (this.item?.children?.length === undefined) {
      return false;
    }

    return this.item?.children?.length > 0;
  }
  haveIcon(): boolean {
    if (this.item?.icon === undefined) {
      return false;
    }

    return this.item?.icon?.length > 0;
  }
  itemName(): string {
    return this.item?.name ?? "";
  }
  itemIcon(): string {
    return this.item?.icon ?? "";
  }

  protected readonly UndoIcon = UndoIcon;
}
