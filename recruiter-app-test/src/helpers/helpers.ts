import { User } from "firebase/auth";
import { IAuthMessage, ISnack } from "types/index";

import { constants } from "@fairdoor/shared-code";
const { authMessages } = constants;

// eslint-disable-next-line no-prototype-builtins
export const getUserId = (user: User | undefined | null): string | null =>
  user && "uid" in user ? user.uid : null;

export const showSnack = (
  setSnack: (a: ISnack) => void,
  code: IAuthMessage
) => {
  setSnack({
    open: true,
    message: code && "message" in code ? code.message : "An error occured",
    variant: code && "variant" in code ? code.variant : "error",
  });
};

export const handleAuthMessages = (
  code: keyof typeof authMessages
): IAuthMessage => authMessages[code];

export const removeUndefinedKey = (obj: Record<string, any>) => {
  Object.keys(obj).forEach((key: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (obj[key] === undefined) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      delete obj[key];
    }
  });
};
