import { Page } from "@playwright/test";
import { ControlPanelPage } from "./ControlPanelPage";

export class UsersPage extends ControlPanelPage {
  constructor(page: Page) {
    super(page);
  }
}
