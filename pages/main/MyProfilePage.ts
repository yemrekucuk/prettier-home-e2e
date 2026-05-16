import { Page, Locator } from "@playwright/test";
import { NavbarPage } from "../NavbarPage";

export class MyProfilePage extends NavbarPage {
  constructor(page: Page) {
    super(page);
  }
}
