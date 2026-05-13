import { Page, Locator } from "@playwright/test";
import { Navbar } from "../Navbar";

export class MyProfilePage extends Navbar {
  constructor(page: Page) {
    super(page);
  }
}
