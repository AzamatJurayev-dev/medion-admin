import dayjs from "dayjs";

export interface TimeSlot {
  start: string; // "HH:mm"
  end: string; // "HH:mm"
}

/**
 * Start va end vaqtni appointmentDuration bo‘yicha bo‘lib, slotlar array qaytaradi
 */
export const generateTimeSlots = (
  startTime: string,
  endTime: string,
  appointmentDuration: number // minutlarda
): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  let start = dayjs(startTime, "HH:mm");
  const end = dayjs(endTime, "HH:mm");

  while (start.isBefore(end)) {
    const slotEnd = start.add(appointmentDuration, "minute");
    if (slotEnd.isAfter(end)) break; // oxirgi slotni kesib tashlash
    slots.push({
      start: start.format("HH:mm"),
      end: slotEnd.format("HH:mm"),
    });
    start = slotEnd;
  }

  return slots;
};
