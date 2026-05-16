import { Page, Locator } from "@playwright/test";
import { NavbarPage } from "../NavbarPage";

export class ContactPage extends NavbarPage {
  constructor(page: Page) {
    super(page);
  }
}
