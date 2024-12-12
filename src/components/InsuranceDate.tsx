import React, { useState, useEffect, useContext } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import { CalendarOutlined } from "@ant-design/icons";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { FormStoreContext } from "../store/store";

interface InsuranceStartDateProps {
  initialDate?: Date;
}

const InsuranceDate: React.FC<InsuranceStartDateProps> = observer(
  ({ initialDate }) => {
    const formStore = useContext(FormStoreContext);
    const { userData } = formStore;

    const initialMoment = initialDate ? moment(initialDate) : moment();
    const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(
      initialMoment,
    );
    const [open, setOpen] = useState(false);

    const currentDay = initialMoment.date();
    const currentMonth = initialMoment.month() + 1; // moment months are 0-indexed
    const currentYear = initialMoment.year();

    const [day, setDay] = useState(currentDay);
    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);

    const monthNames = moment.months();

    useEffect(() => {
      runInAction(() => {
        userData.startDate = selectedDate?.format("YYYY-MM-DD") || null;
      });
    }, [selectedDate]);

    useEffect(() => {
      const date = moment(`${year}-${month}-${day}`, "YYYY-MM-DD");
      if (date.isValid()) {
        setSelectedDate(date);
      }
    }, [day, month, year]);

    const days = Array.from(
      { length: new Date(year, month, 0).getDate() },
      (_, i) => i + 1,
    );
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from(
      { length: 10 },
      (_, i) => initialMoment.year() - i,
    );

    const handleDatePickerChange = (date: moment.Moment | null) => {
      if (date) {
        setDay(date.date());
        setMonth(date.month() + 1);
        setYear(date.year());
        setSelectedDate(date);
        setOpen(false);
      }
    };

    const handleCalendarIconClick = () => {
      setOpen(!open);
    };

    return (
      <div className="flex items-center space-x-3">
        {/* Dropdowns for day, month, year as before */}

        <DatePicker
          value={selectedDate}
          onChange={handleDatePickerChange}
          open={open}
          className="rounded-xl"
          onOpenChange={setOpen}
          renderExtraFooter={() => (
            <CalendarOutlined onClick={handleCalendarIconClick} />
          )}
          disabledDate={(current) =>
            current && current < moment(initialDate).startOf("day")
          }
        />
      </div>
    );
  },
);

export default InsuranceStartDate;
