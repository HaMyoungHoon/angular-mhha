import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DocModel} from "../../../models/common/doc-model";
import {Router} from "@angular/router";
import {Meta, Title} from "@angular/platform-browser";
import {NgClass, NgIf} from "@angular/common";
import {AppDocSectionComponent} from "./app-docsection/app-doc-section.component";
import {AppDocModule} from "./app-doc.module";
import {AppDocSectionNavComponent} from "./app-doc-section-nav/app-doc-section-nav.component";
import {AppDocApiSectionComponent} from "./app-doc-api-section/app-doc-api-section.component";

@Component({
  selector: 'app-app-doc',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    AppDocSectionComponent,
    AppDocModule,
    AppDocSectionNavComponent,
    AppDocApiSectionComponent
  ],
  templateUrl: './app-doc.component.html'
})
export class AppDocComponent implements OnInit, OnChanges {
  @Input() docTitle: string;
  @Input() docs: DocModel[];
  @Input() apiDocs: string[];
  @Input() header: string;
  @Input() description: string;
  activeTab: number;

  constructor(private router: Router, private titleService: Title, private metaService: Meta, private cd: ChangeDetectorRef) {
    this.docTitle = "";
    this.docs = [];
    this.apiDocs = [];
    this.header = "";
    this.description = "";
    this.activeTab = 0;
  }

  ngOnInit() {
    if (this.router.url.includes('#api')) {
      this.activeTab = 1;
    } else {
      this.activeTab = 0;
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    // @ts-ignore
    if (changes.docTitle && changes.docTitle.currentValue) {
      // @ts-ignore
      this.titleService.setTitle(changes.docTitle.currentValue);
    }

    // @ts-ignore
    if (changes.description && changes.description.currentValue) {
      // @ts-ignore
      this.metaService.updateTag({ name: 'description', content: changes.description.currentValue });
    }
  }

  activateTab(index: number): void {
    this.activeTab = index;
  }
}
