import { TRole } from "./role";

export type TUser = {
  id: string;
  name?: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  createdAt: string;
  updatedAt: string;
  role: TRole;
};
