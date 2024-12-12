import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { FormStoreContext } from "../store/store";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { runInAction } from "mobx";

const TabBar = observer(() => {
  const formStore = useContext(FormStoreContext);
  const { currentFormState, formStates } = formStore;
  return (
    <div className={`w-full flex py-1 gap-3 items-center justify-between`}>
      <div className={`w-full flex gap-1 items-center`}>
        {formStates.map((state) => (
          <div
            key={state}
            className={`p-1 w-full cursor-pointer rounded ${currentFormState === state ? "bg-green" : "bg-blueBg"}`}
          />
        ))}
      </div>
      {currentFormState !== "info" && (
        <ArrowLeftCircleIcon
          onClick={() =>
            runInAction(() => {
              formStore.currentFormState =
                formStates[formStates.indexOf(currentFormState) - 1];
            })
          }
          className={`text-darkBlue w-[2.5rem] h-[2rem]`}
        />
      )}
    </div>
  );
});

export default TabBar;
