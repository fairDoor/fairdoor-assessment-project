import React, { ComponentType, useEffect } from "react";
import { routes } from "helpers/const";
import { auth } from "config/firebaseInit";
import { Loading } from "@fairdoor/shared-code";
import { useAuthState } from "react-firebase-hooks/auth";
import { getUserId } from "helpers/helpers";
import { useLocalStorage } from "react-use";
import { useRouter } from "next/router";

export function withUserData<T>(Base: ComponentType<T>) {
  const Component = (hocProps: Omit<T, "uid" | "userEmail">) => {
    const [uid, setUid] = useLocalStorage<string | null>("uid", null);
    const router = useRouter();
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
      if (user !== null) {
        setUid(getUserId(user));
      }
    }, [user]);

    if (loading) return <Loading />;
    if (user !== null) {
      return (
        <Base
          {...(hocProps as T)}
          uid={getUserId(user)}
          userEmail={user && user.email}
          key={uid}
        />
      );
    } else {
      router.push({
        pathname: routes.login,
        query: { returnUrl: router.asPath },
      });
      return (
        <Base {...(hocProps as T)} uid={null} userEmail={null} key={uid} />
      );
    }
  };
  return Component;
}
