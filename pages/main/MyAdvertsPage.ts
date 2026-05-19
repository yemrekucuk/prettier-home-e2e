import { Page, Locator } from "@playwright/test";
import { NavbarPage } from "./NavbarPage";

export class MyAdvertsPage extends NavbarPage {
  readonly propertyRows: Locator;
  readonly editButtons: Locator;
  readonly deleteButtons: Locator;
  
  readonly confirmYesButton: Locator;
  readonly confirmNoButton: Locator;

  readonly paginationNext: Locator;
  readonly paginationPrev: Locator;
  readonly paginationPages: Locator;

  constructor(page: Page) {
    super(page);
    
    // Rows (assuming they are inside a table or card list, we'll just target the row container)
    // Often it's a grid or table or p-card. Let's target by a common structure, or just the buttons
    this.propertyRows = page.locator('.property-card, tr, .card'); 
    
    // Based on subagent research, buttons have these classes
    this.editButtons = page.locator('.btn-link.btn-primary:has(.fa-pencil), .btn-link.btn-primary:has(svg.p-button-icon-right), button:has-text("Edit"), a:has-text("Edit")');
    // Fallback: If classes differ, we'll try to find buttons with pencil or trash icons
    this.deleteButtons = page.locator('.btn-link.btn-primary:has(.fa-trash), button:has-text("Delete"), a:has-text("Delete")');

    // Confirm dialog buttons (typically Yes/No in a standard confirmation modal or p-dialog)
    this.confirmYesButton = page.locator('button:has-text("Yes"), button:has-text("Evet")');
    this.confirmNoButton = page.locator('button:has-text("No"), button:has-text("Hayır")');

    // Pagination
    this.paginationNext = page.locator('.p-paginator-next, [aria-label="Next Page"], .page-link:has-text("Next")');
    this.paginationPrev = page.locator('.p-paginator-prev, [aria-label="Previous Page"], .page-link:has-text("Previous")');
    this.paginationPages = page.locator('.p-paginator-page, .page-item:not(.disabled) .page-link');
  }

  async getEditButtonByTitle(title: string) {
    // Finds the specific edit button for a row containing the title
    return this.page.locator(`text=${title}`).locator('..').locator('.btn-link.btn-primary').nth(1);
  }

  async getDeleteButtonByTitle(title: string) {
    // Finds the specific delete button for a row containing the title
    return this.page.locator(`text=${title}`).locator('..').locator('.btn-link.btn-primary').first();
  }
}
