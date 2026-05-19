import { Page } from "@playwright/test";
import { ControlPanelPage } from "./ControlPanelPage";

export class TourRequestsPage extends ControlPanelPage {
  constructor(page: Page) {
    super(page);
  }
}
