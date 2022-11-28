export enum FormTypes {
  LOGIN = "LOGIN",
  REGIN = "REGIN",
}
export interface FormProps {
  formType: FormTypes;
  toggleForm: () => void;
}
