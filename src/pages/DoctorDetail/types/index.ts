export interface DoctorResponse {
  data: DoctorData;
}

export interface DoctorData {
  id: number;
  workExperience: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  name: MultiLangField;
  about: MultiLangField;
  experience: MultiLangField;
  education: MultiLangField;
  award: MultiLangField;
  departments: DepartmentsRelation;
  workSchedule: WorkSchedule;
  appointmentDuration: string;
  workPhotos: { data: WorkPhotos[] };
  image: ImageRelation;
}
export interface DaySchedule {
  start_time: string;
  end_time: string;
}
export interface WorkPhotos {
  id: number;
  url: string;
}
export interface WorkSchedule {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface MultiLangField {
  id: number;
  uz: string;
  ru: string;
  en: string;
}

export interface DepartmentsRelation {
  data: Department[];
}

export interface Department {
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  titleUz: string;
  titleRu: string;
  titleEn: string;
}

export interface ImageRelation {
  data: ImageData;
}

export interface ImageData {
  id: number;
  name: string;
  url: string;
}
