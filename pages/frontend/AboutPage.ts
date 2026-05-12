import { Page } from "@playwright/test";
import { BasePage } from "../BasePage"; 

export class AboutPage extends BasePage {
  constructor(page: Page) {
    super(page); 
  }
}