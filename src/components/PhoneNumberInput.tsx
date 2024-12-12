import React, { useContext } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { observer } from "mobx-react-lite";
import { FormStoreContext } from "../store/store";
import { runInAction } from "mobx";

const PhoneNumberInput: React.FC = observer(() => {
  const formStore = useContext(FormStoreContext);
  const { userData } = formStore;

  const handlePhoneChange = (phone: string | undefined) => {
    runInAction(() => {
      userData.phone = phone || "";
    });
  };

  return (
    <div className="flex items-center space-x-3">
      <PhoneInput
        international
        defaultCountry="UZ"
        value={userData.phone!}
        onChange={handlePhoneChange}
        className="input-class"
      />
    </div>
  );
});

export default PhoneNumberInput;
