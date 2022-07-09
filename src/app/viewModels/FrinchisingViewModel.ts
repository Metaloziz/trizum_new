export interface FrinchisingViewModel {
  id?: string; // если id пустой - создание, в противном случае редактирование
  shortName: string;
  fullName: string;
  inn: string;
  legalAddress: string;
  actualAddress: string;
  schoolName: string;
  ogrn: string;
  kpp: string;
  checkingAccount: string;
  phone: string;
  email: string;
  city: string;
  bankBill: string;
  bankName: string;
  bankBik: string;
  bankInn: string;
  bankKpp: string;
}
