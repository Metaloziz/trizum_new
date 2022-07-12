import { FranchisingViewModel } from "app/viewModels/FranchisingViewModel";

export type FranchisingFilterViewModel = Pick<FranchisingViewModel, "fullName" | "checkingAccount" | "phone" | "shortName" | "email" | "inn" | "city">;