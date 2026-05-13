import { Page } from "@playwright/test";
import { ControlPanelPage } from "./ControlPanelPage"; 

export class ReportsPage extends ControlPanelPage {
  constructor(page: Page) {
    super(page); 
  }
}