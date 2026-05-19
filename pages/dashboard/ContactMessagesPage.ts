import { Page } from "@playwright/test";
import { ControlPanelPage } from "./ControlPanelPage";

export class ContactMessagesPage extends ControlPanelPage {
  constructor(page: Page) {
    super(page);
  }
}
