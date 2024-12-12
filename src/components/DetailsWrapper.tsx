import React, { useContext } from "react";
import { Popover } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { FormStoreContext } from "../store/store";

interface SectionWrapperProps {
  value: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

const SectionWrapper = observer(
  ({ value, title, description, children }: SectionWrapperProps) => {
    const formStore = useContext(FormStoreContext);
    const { errorSections } = formStore;
    return (
      <div className=" section-wrapper mb-4">
        <div className="flex justify-between items-center mb-2 px-1">
          <h3
            className={`${errorSections.includes(value) ? "text-red-600" : "text-lightGray"}`}
          >
            {title}
          </h3>
          <Popover content={description} title={title} trigger="click">
            <QuestionCircleOutlined style={{ color: "rgba(0,0,0,0.45)" }} />
          </Popover>
        </div>
        {children}
      </div>
    );
  },
);

export default SectionWrapper;
