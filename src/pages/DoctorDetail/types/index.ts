export interface DoctorResponse {
  data: DoctorData;
}

export interface DoctorData {
  id: number;
  attributes: DoctorAttributes;
}

export interface DoctorAttributes {
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
  image: ImageRelation;
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
  attributes: DepartmentAttributes;
}

export interface DepartmentAttributes {
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
  attributes: ImageAttributes;
}

export interface ImageAttributes {
  name: string;
  url: string;
}

export interface ImageFormats {
  thumbnail: ImageFormat;
  small: ImageFormat;
  medium: ImageFormat;
  large: ImageFormat;
}

export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  url: string;
}
