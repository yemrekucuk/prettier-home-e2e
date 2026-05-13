import { Page, Locator } from "@playwright/test";
import { Navbar } from "../Navbar";

export class ContactPage extends Navbar {
  constructor(page: Page) {
    super(page);
  }
}
