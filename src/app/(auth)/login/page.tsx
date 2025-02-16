"use client";

import { useEffect, useState } from "react";
import { useObservable } from "dexie-react-hooks";
import { db } from "@/db";
import { resolveText, DXCInputField } from "dexie-cloud-addon";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

export default function Login() {
  const [params, setParams] = useState<{ [param: string]: string }>({});
  const ui = useObservable(db.cloud.userInteraction);
  const currentUser = useObservable(db.cloud.currentUser);
  const { t } = useTranslation();

  useEffect(() => {
    if (currentUser?.isLoggedIn) return redirect("/");

    db.cloud.login();
  }, [currentUser]);

  console.log(ui?.fields);

  if (!ui) return <div>Loading...</div>;
  return (
    <div className="">
      <h1>Login</h1>

      <div className="dlg-inner">
        <h3>{ui.title}</h3>
        {ui.alerts?.map((alert, i) => (
          <p key={i} className={`dxcdlg-alert-${alert.type}`}>
            {resolveText(alert)}
          </p>
        ))}
        {(Object.entries(ui.fields) as [string, DXCInputField][]).map(
          ([fieldName, { type, placeholder }]) =>
            type === "email" ? (
              <Input
                key={fieldName}
                type="email"
                value={params[fieldName] || ""}
                placeholder={placeholder}
                onChange={(v) =>
                  setParams((params) => ({
                    ...params,
                    [fieldName]: v.target.value,
                  }))
                }
              />
            ) : (
              type === "otp" && (
                <InputOTP
                  key={fieldName}
                  maxLength={8}
                  value={params[fieldName] || ""}
                  onChange={(v) =>
                    setParams((params) => ({ ...params, [fieldName]: v }))
                  }
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                    <InputOTPSlot index={6} />
                    <InputOTPSlot index={7} />
                  </InputOTPGroup>
                </InputOTP>
              )
            )
        )}
        <Button className="w-full" onClick={() => ui.onSubmit(params)}>
          {t("sign-in")}
        </Button>
      </div>
    </div>
  );
}
