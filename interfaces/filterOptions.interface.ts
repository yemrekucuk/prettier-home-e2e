/**
 * Arama ve filtreleme için kullanılan ortak şablon.
 * Soru işareti (?) bu alanların opsiyonel olduğunu belirtir.
 */
export interface FilterOptions {
  searchText?: string;
  advertType?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  country?: string;
  city?: string;
  district?: string;
  advertTypeField?: string;
  locationField?: string;
  searchInput?: string;
  description?: string;
}
