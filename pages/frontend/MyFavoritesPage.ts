import { Page } from "@playwright/test";
import { BasePage } from "../BasePage"; 

export class MyFavoritesPage extends BasePage {
  constructor(page: Page) {
    super(page); 
  }
}