export const enums = [
  { value: "all", label: "all" },
  { value: "children", label: "Children" },
  { value: "adults", label: "Adults" },
];

export const appointmentDuration = [
  { value: 10, label: "10 minut" },
  { value: 15, label: "15 minut" },
  { value: 20, label: "20 minut" },
  { value: 30, label: "30 minut" },
  { value: 60, label: "60 minut" },
  { value: 90, label: "90 minut" },
];

export const Lang = ["uz", "en", "ru"] as const;

export const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;
