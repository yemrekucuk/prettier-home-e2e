import { Page, Locator } from "@playwright/test";
import { NavbarPage } from "../NavbarPage";

export class RegisterPage extends NavbarPage {
  constructor(page: Page) {
    super(page);
  }
}
