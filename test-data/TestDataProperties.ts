import { FilterOptions } from "../interfaces/filterOptions.interface";
import { DateUtils } from "../utils/DateUtils";

/**
 * Kullanıcı Giriş Bilgileri (.env dosyasından çekilir)
 * Her rolün kendi e-posta ve şifresi merkezi olarak buradan yönetilir.
 */
export const CREDENTIALS = {
  customer: {
    email: process.env.CUSTOMER_EMAIL as string,
    password: process.env.CUSTOMER_PASSWORD as string,
  },
  manager: {
    email: process.env.MANAGER_EMAIL as string,
    password: process.env.MANAGER_PASSWORD as string,
  },
  admin: {
    email: process.env.ADMIN_EMAIL as string,
    password: process.env.ADMIN_PASSWORD as string,
  }
};

/**
 * Arama ve Filtreleme Verileri
 */
export const PROPERTIES_DATA: FilterOptions = {
  minPrice: "400000",
  maxPrice: "700000",
  advertType: "Sale",
  category: "Villa",
  country: "Türkiye",
  locationField:"Gölbaşı, Ankara, Türkiye",
  city: "Ankara",
  district: "Gölbaşı",
  searchInput: "villa",
  advertTypeField:"SALE",
  description: "A luxurious villa with a pool, nestled in nature in Gölbaşı.",
};

export const testData = {
   date: "2026-05-20",
   time: "14:00",
};
 
export const tourRequestData = {
  propertyName: "Luxury Villa With Pool",
  updatedDate: "2025-05-20",
  updatedTime: "10:00",
};



/**
 * Randevu Verileri
 */
export const TOUR_DATA = {
  valid: {
    date: DateUtils.future(5),
    time: "14:00",
  },
};
