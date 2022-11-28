export enum PasswordTrobles {
  _NP = "",
  PASSWORDS_ARE_EMPRY = "PASSWORDS_ARE_EMPRY",
  PASSWORD_MISMATCH = "PASSWORD_MISMATCH",
  PASSWORD_TOO_SHORT = "PASSWORD_TOO_SHORT",
  NEW_PASSWORD_EQUAL_OLD_PASSWORD = "NEW_PASSWORD_EQUAL_OLD_PASSWORD",
}
export interface IValidator {
  status: boolean;
}
export interface PasswordValidator extends IValidator {
  troble: PasswordTrobles;
}
export function passwordValidator(newPassword: string, newPassword2: string, originalPassword?: string): PasswordValidator {
  if (!newPassword || !newPassword2) {
    return { status: false, troble: PasswordTrobles.PASSWORDS_ARE_EMPRY } as PasswordValidator;
  }
  if (newPassword !== newPassword2) {
    return { status: false, troble: PasswordTrobles.PASSWORD_MISMATCH } as PasswordValidator;
  }
  if (newPassword.length < 4) {
    return { status: false, troble: PasswordTrobles.PASSWORD_TOO_SHORT } as PasswordValidator;
  }

  if (originalPassword && originalPassword === newPassword) {
    return { status: false, troble: PasswordTrobles.NEW_PASSWORD_EQUAL_OLD_PASSWORD } as PasswordValidator;
  }

  return { status: true } as PasswordValidator;
}
