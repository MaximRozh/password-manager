import { PasswordItemsI } from "./PasswordItemsType";
import { LoginI } from "./RegistrationTypes";

export interface UserI extends LoginI {
  firstName: string;
  lastName: string;
  passwordsItems: PasswordItemsI[];
}
