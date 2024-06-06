export interface DocMenuItem {
  name?: string;
  icon?: string;
  children?: DocMenuItem[];
  routerLink?: string;
  href?: string;
  badge?: string;
}
