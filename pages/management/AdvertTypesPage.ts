import { Page } from "@playwright/test";
import { ControlPanelPage } from "./ControlPanelPage"; 

export class AdvertTypesPage extends ControlPanelPage {
  constructor(page: Page) {
    super(page); 
  }
}