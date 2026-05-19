import { Page, Locator } from "@playwright/test";
import { NavbarPage } from "./NavbarPage";

export class MyProfilePage extends NavbarPage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly phoneInput: Locator;
  readonly emailInput: Locator;
  readonly updateButton: Locator;
  readonly changePasswordTab: Locator;
  readonly currentPasswordInput: Locator;
  readonly newPasswordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly changeButton: Locator;
  readonly profilePhotoTab: Locator;
  readonly selectButton: Locator;
  readonly fileInput: Locator;
  readonly doneButton: Locator;
  readonly saveButton: Locator;
  readonly deleteAccountTab: Locator;
  readonly deletePasswordInput: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.phoneInput = page.getByRole('textbox', { name: '(XXX) XXX-XXXX' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.updateButton = page.getByRole('button', { name: 'UPDATE' });
    this.changePasswordTab = page.getByRole('tab', { name: 'Change Password' });
    this.currentPasswordInput = page.getByRole('textbox', { name: 'Current Password' });
    this.newPasswordInput = page.getByRole('textbox', { name: 'New Password' });
    this.confirmPasswordInput = page.getByRole('textbox', { name: 'Confirm Password' });
    this.changeButton = page.getByRole('button', { name: 'CHANGE' });
    this.profilePhotoTab = page.getByRole('tab', { name: 'Profile Photo' });
    this.selectButton = page.locator('button.select-button');
    this.fileInput = page.locator('input[type="file"]');
    this.doneButton = page.getByRole('button', { name: 'DONE' });
    this.saveButton = page.getByRole('button', { name: 'SAVE' });
    this.deleteAccountTab = page.getByRole('tab', { name: 'Delete Account' });
    this.deletePasswordInput = page.getByRole('textbox', { name: 'Enter your password' });
  }
}