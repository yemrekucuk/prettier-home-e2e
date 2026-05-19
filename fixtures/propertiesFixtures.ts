import { test as base } from "@playwright/test";
import { PropertiesPage } from "../pages/main/PropertiesPage";
import { LoginPage } from "../pages/main/LoginPage";
import { ListingDetailsPage} from "../pages/main/ListingDetailsPage";
import { MyTourRequestsPage } from "../pages/main/MyTourRequestsPage";

// 1. Tüm sayfaların tiplerini buraya ekliyoruz
type PropertiesFixtures = {
  loginPage: LoginPage;
  propertiesPage: PropertiesPage;
  listingDetailsPage: ListingDetailsPage;
  myTourRequestsPage: MyTourRequestsPage;
};

// 2. Sayfaları 'extend' ederek fixture'a dahil ediyoruz
export const test = base.extend<PropertiesFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  propertiesPage: async ({ page }, use) => {
    await use(new PropertiesPage(page));
  },
  listingDetailsPage: async ({ page }, use) => {
    await use(new ListingDetailsPage(page));
  },
  myTourRequestsPage: async ({ page }, use) => {
    await use(new MyTourRequestsPage(page));
  },
});

export { expect } from "@playwright/test";
