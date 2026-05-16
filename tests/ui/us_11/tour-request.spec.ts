import { test, expect } from "../../../fixtures/propertiesFixtures";
import { NavbarPage } from "../../../pages/NavbarPage";
import {
  PROPERTIES_DATA,
  testData,
} from "../../../test-data/TestDataProperties";
import { DateUtils } from "../../../utils/DateUtils";
import { WaitUtils } from "../../../utils/WaitUtils";

test.describe("Tour Request Flow", () => {
  test.beforeEach(async ({ page, loginPage, propertiesPage }) => {
    await page.goto("/");
    await loginPage.loginAsCustomer();
    await loginPage.clickPropertiesLink();

    // filtersearch methodu ve icine testdatadaki datalar
    await propertiesPage.filterSearch(PROPERTIES_DATA);

    // Search
    await propertiesPage.clickSearch();

    // İlk ilana gir
    await propertiesPage.listingCards.first().click();
  });

  //-----------------------------------------------//
  //TC_10 Owner Contact Information Goruntuleme
  test("TC_10  Owner Contact Information görüntülenmeli", async ({
    listingDetailsPage,
  }) => {
    //1)Ilan sahibinin bilgilerinin oldugu alan gorunuyor mu
    await expect(listingDetailsPage.ownerContactSection).toBeVisible();
    //2)Ilan sahibinin ismi gorunuyor mu
    await expect(listingDetailsPage.ownerName).toBeVisible();
    //3)Ilan sahibini telefon numarasi gorunuyor mu
    await expect(listingDetailsPage.contactNumberButton).toBeVisible();
    //4)Ilan icin mail gonderme butonu gorunuyor mu
    await expect(listingDetailsPage.sendMailButton).toBeVisible();
  });

  //--------------------------------------
  //TC_11- Schedule a Tour => Create Tour Request
  test("TC_11 Customer Tour Request Olusturabilmeli", async ({
    page,
    listingDetailsPage,
  }) => {
    //1)Olusturdugumuz schedule methodla hem input iclerini doluysa temizleyip+date utils method kullanarak tarih ve saat seciyoruz
    await listingDetailsPage.scheduleATour(DateUtils.future(3), "14:00");
    //2)Randevuyu olusturmak icin submit
    await listingDetailsPage.submitTourButton.click();
    //3)Olusturdugumuz randevuyu wateutils method ile kontrol edip dogruluyoruz
    await WaitUtils.waitForToast(page, "TourRequest created successfully");
  });
});

test.describe("My Tour Requests Flow", () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await page.goto("/");
    await loginPage.loginAsCustomer();
  });

  test("TC_13 Customer Tour Request kaydını silebilmeli", async ({
    propertiesPage,
    myTourRequestsPage,
  }) => {
    //1)Use linki aciyoruz
    await propertiesPage.userLogo.click();
    //2)Acilan menuden my tour request linki tikliyoruz
    await propertiesPage.myTourRequestsLink.click();
    //3)Olusturdugumuz delete methodu ile hem delete butona tiklayip+hem yes click yapip hem gelen basari mesaji dogruluyoruz
    await myTourRequestsPage.deleteRequest();
  });

  test("TC_14 Customer Tour Request kaydini güncelleyebilmeli", async ({
    page,
    propertiesPage,
    myTourRequestsPage,
  }) => {
    //1)User linki aciyoruz
    await propertiesPage.userLogo.click();
    //2)Acilan menuden my Tour Request i tikliyoruz
    await propertiesPage.myTourRequestsLink.click();
    //3)MYTR Page de olusturdugumuz edit methoduyla properties edit icine giriryoruz
    await myTourRequestsPage.clickEditRequest("Luxury Villa With Pool");
    //4)Acilan edit formunda olusturdugumuz update methodunu + test datadaki verileri kullanarak formu doldurp update e tikliyoruz
    await myTourRequestsPage.updateTourRequest(testData.date, testData.time);
    //5)Utils dosyamizdaki waitutils methodunu kullanarak update in basarili oldugu mesajini dogruluyoruz
    await WaitUtils.waitForToast(page, "TourRequest created successfully");
  });
});
