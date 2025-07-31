export interface OrgAttributes {
  short_number: string;
  phoneNumber: string;
  mail: string;
}
export interface OrgItem{
    id: number;
    attributes:OrgAttributes
}