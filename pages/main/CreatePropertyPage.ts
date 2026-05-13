import { Page, Locator } from "@playwright/test";
import { Navbar } from "../Navbar";

export class CreatePropertyPage extends Navbar {
  constructor(page: Page) {
    super(page);
  }
}
