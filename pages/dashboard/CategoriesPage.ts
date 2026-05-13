import { Page } from "@playwright/test";
import { ControlPanelPage } from "./ControlPanelPage"; 

export class CategoriesPage extends ControlPanelPage {
  constructor(page: Page) {
    super(page); 
  }
}