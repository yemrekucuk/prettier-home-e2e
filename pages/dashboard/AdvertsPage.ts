import { Page } from "@playwright/test";
import { ControlPanelPage } from "./ControlPanelPage"; 

export class AdvertsPage extends ControlPanelPage {
  constructor(page: Page) {
    super(page); 
  }
}