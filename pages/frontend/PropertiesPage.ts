import { Page } from "@playwright/test";
import { BasePage } from "../BasePage"; 

export class PropertiesPage extends BasePage {
  constructor(page: Page) {
    super(page); 
  }
}