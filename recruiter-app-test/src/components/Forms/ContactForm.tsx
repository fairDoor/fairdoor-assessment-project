import React, { useState } from "react";

import { SelectChangeEvent } from "@mui/material/Select";
import {
  LabelTextField,
  WrapperAuthForm,
  constants,
  commonHelpers,
  LabelSelect,
} from "@fairdoor/shared-code";

import { useTranslation } from "next-i18next";
import isEmpty from "lodash/isEmpty";
const { COMPANY_SIZES, SECTORS, medias } = constants;
const { getBackendLabel } = commonHelpers;
interface Props {
  submitOnClick: (formData: any) => void; //Promise<void>
}

const ContactForm = (props: Props) => {
  const { t } = useTranslation(["common", "backend"]);
  const { submitOnClick } = props;
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // check that company name do not already exist
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [sector, setSector] = useState("");

  const formData = {
    firstName,
    lastName,
    email,
    password,
    phone,
    companyName,
    companySize,
    sector,
    medias,
  };

  const button = {
    onClick: () => submitOnClick(formData),
    disabled: isEmpty(email) || isEmpty(password) || isEmpty(companyName),
    submitMessage: t("contactForm.submitMessage"),
    fullWidth: true,
    variant: "contained" as "contained" | "outlined",
  };
  return (
    <WrapperAuthForm buttons={[button]}>
      <LabelTextField
        required
        label={t("contactForm.firstName")}
        value={firstName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setFirstName(event.currentTarget.value)
        }
      />
      <LabelTextField
        required
        label={t("contactForm.lastName")}
        value={lastName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setLastName(event.currentTarget.value)
        }
      />
      <LabelTextField
        label={t("contactForm.phoneNumber")}
        value={phone}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setPhone(event.currentTarget.value)
        }
        type="tel"
      />
      <LabelTextField
        required
        label={t("contactForm.companyName")}
        value={companyName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setCompanyName(event.currentTarget.value)
        }
      />

      <LabelSelect
        label={t("companyForm.size")}
        value={companySize}
        required
        onChange={(event: SelectChangeEvent) =>
          setCompanySize(event.target.value)
        }
        itemsToSelect={COMPANY_SIZES}
        sx={{ select: { p: 0, m: 0 } }}
        sizeLabel="h4"
        getLabel={(item: string) => getBackendLabel(item, "companySizes", t)}
      />
      <LabelSelect
        label={t("companyForm.sector")}
        value={sector}
        required
        onChange={(event: SelectChangeEvent) => setSector(event.target.value)}
        itemsToSelect={SECTORS}
        sx={{ select: { p: 0, m: 0 } }}
        sizeLabel="h4"
        getLabel={(item: string) => getBackendLabel(item, "sectors", t)}
      />
      <LabelTextField
        required
        label={t("contactForm.email")}
        value={email}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(event.currentTarget.value)
        }
        type="email"
      />
      <LabelTextField
        required
        label={t("contactForm.password")}
        value={password}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(event.currentTarget.value)
        }
        type="password"
      />
    </WrapperAuthForm>
  );
};

export default ContactForm;
