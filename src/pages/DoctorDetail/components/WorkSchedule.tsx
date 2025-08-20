// WorkSchedule.tsx
import { Card } from "antd";
import type { DoctorData } from "../types";

interface Props {
  data?: DoctorData;
}

const WorkSchedule = ({ data }: Props) => {
  if (!data?.workSchedule) return <p>No schedule</p>;

  const scheduleArray = Object.entries(data.workSchedule).filter(
    ([key]) => key !== "id"
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
      {scheduleArray.map(([day, { start_time, end_time }]) => (
        <Card key={day} title={day.toUpperCase()} className="rounded-xl">
          <p>
            <b>Start:</b> {start_time.slice(0, 5)}
          </p>
          <p>
            <b>End:</b> {end_time.slice(0, 5)}
          </p>
        </Card>
      ))}
    </div>
  );
};

export default WorkSchedule;
