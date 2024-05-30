import {Component, EventEmitter, Inject, Output, Renderer2} from '@angular/core';
import {DOCUMENT, NgClass, NgForOf} from "@angular/common";
import {AppConfigService} from "../../../services/app-config.service";
import {PrimeNGConfig} from "primeng/api";
import {SidebarModule} from "primeng/sidebar";
import {SelectButtonModule} from "primeng/selectbutton";
import {InputSwitchModule} from "primeng/inputswitch";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-app-config',
  standalone: true,
  imports: [
    SidebarModule,
    NgClass,
    SelectButtonModule,
    InputSwitchModule,
    FormsModule,
    ButtonModule,
    NgForOf
  ],
  templateUrl: './app-config.component.html'
})
export class AppConfigComponent {
  inputStyles = [
    { label: 'Outlined', value: 'outlined' },
    { label: 'Filled', value: 'filled' }
  ];
  scales: number[] = [10, 12, 14, 16, 18];
  @Output() onDarkModeSwitch = new EventEmitter<any>();

  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, private configService: AppConfigService,
              private config: PrimeNGConfig) {
  }

  get isActive(): boolean {
    return this.configService.state.configActive ?? false;
  }
  get isDarkMode(): boolean {
    return this.configService.config().darkMode ?? true;
  }
  get inputStyle(): string {
    return this.config.inputStyle();
  }
  set inputStyle(val: 'outlined' | 'filled') {
    this.config.inputStyle.set(val);
  }
  get ripple(): boolean {
    return this.configService.config().ripple ?? false;
  }
  set ripple(val: boolean) {
    this.configService.config.update((config) => ({...config, ripple: val}));
  }
  get scale(): number {
    return this.configService.config().scale ?? 14;
  }
  set scale(val: number) {
    this.configService.config.update((config) => ({ ...config, scale: val }));
  }

  onVisibleChange(value: boolean): void {
    if (!value) {
      this.configService.hideConfig();
    }
  }
  onRippleChange(event: any): void {
    this.ripple = event.checked;
  }

  onInputStyleChange(event: any): void {
    this.inputStyle = event.value;
  }

  toggleDarkMode(): void {
    this.onDarkModeSwitch.emit(null);
  }
  decrementScale(): void {
    this.scale = this.scale - 2;
  }
  incrementScale(): void {
    this.scale = this.scale + 2;
  }

  protected readonly event = event;
}
