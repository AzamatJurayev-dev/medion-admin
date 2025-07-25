export interface Login {
  identifier: string;
  password: string;
}
export interface JwtResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    confirmed: boolean;
    blocked: boolean;
    role: {
      id: number;
      name: string;
      description: string;
      type?: string;
    };
  };
}
