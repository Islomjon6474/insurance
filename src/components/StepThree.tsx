import React, { useContext, useState } from "react";
import { Program } from "../types";
import { observer } from "mobx-react-lite";
import { FormStoreContext } from "../store/store";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { runInAction } from "mobx";
import Button from "./Button";

const StepThree: React.FC = observer(() => {
  const formStore = useContext(FormStoreContext);
  const { programs } = formStore;
  const [selectedProgramId, setSelectedProgramId] = useState<number | null>(1);

  const handleSelectProgram = (id: number) => {
    setSelectedProgramId(id);
  };

  return (
    <div className={`w-full`}>
      <h2 className={`text-xl text-darkBlue mb-4 font-semibold`}>
        Выберите программу
      </h2>
      {formStore.userPrograms.map((id: number) => {
        const program = programs[id];
        return (
          <div
            key={program.id}
            className={`p-2 flex border border-programBorder rounded-lg mb-2.5   ${selectedProgramId === program.id ? "bg-white text-green shadow-activeProgram" : "bg-programBg text-darkBlue"}`}
            onClick={() => handleSelectProgram(program.id)}
          >
            <CheckCircleIcon
              className={`h-4 w-4 mr-2 mt-2 text-grayText ${selectedProgramId === program.id && "text-green"}`}
            />
            <div>
              <p className="font-normal text-xl">{program.name}</p>
              <p className={`font-semibold`}>
                Общее покрытие - {program.liability!.toLocaleString()} EUR
              </p>
              <p className={`text-sm text-lightGray`}>{program.description}</p>
            </div>
          </div>
        );
      })}
      <p className="w-full text-center my-4 text-darkBlue py-2 px-4 font-bold">
        Сравнить программы
      </p>
      <Button
        variant="secondary"
        onClick={() =>
          runInAction(() => (formStore.currentFormState = "program"))
        }
        className={`!w-full flex justify-between`}
        containerClassName={`flex !w-full justify-start items-center h-fit `}
      >
        <div className={`w-full flex justify-between`}>
          <p
            className={`text-white font-semibold`}
          >{`Выбрать ${programs[selectedProgramId!].name} `}</p>
          <p
            className={`text-white font-semibold`}
          >{`UZS ${programs[selectedProgramId!].liability} `}</p>
        </div>
      </Button>
    </div>
  );
});

export default StepThree;
