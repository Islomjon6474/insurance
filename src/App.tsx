import React, { useContext, useEffect, useMemo } from "react";
import StepOne from "./components/StepOne";
import StepThree from "./components/StepThree";
import { FormStore, FormStoreContext } from "./store/store";
import { observer } from "mobx-react-lite";
import TabBar from "./components/TabBar";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import UserDataSummary from "./components/UserData";

const App: React.FC = observer(() => {
  const formStore = useContext(FormStoreContext);
  const { countries, currentFormState } = formStore;

  useEffect(() => {
    formStore.loadUserData();
  }, []);

  return (
    <div
      className={`container w-screen  h-screen flex flex-col md:flex-row justify-center items-center md:items-start p-10 gap-4 `}
    >
      <div
        className={`rounded-2xl p-5 w-fit max-w-[25rem] min-w-[20rem] bg-white shadow-card`}
      >
        <TabBar />
        {currentFormState === "info" ? <StepOne /> : <StepThree />}
        <div className={`w-full flex gap-1 items-start py-1`}>
          <ExclamationCircleIcon className={`text-green w-[2.5rem] mt-1`} />
          <p className={`text-lightGray`}>
            Не волнуйтесь! Вы можете покинуть сайт и продолжить с этого момента
            в любое время
          </p>
        </div>
      </div>
      {currentFormState !== "info" && <UserDataSummary />}
    </div>
  );
});

export default App;
