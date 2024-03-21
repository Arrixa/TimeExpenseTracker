import { Session } from "next-auth";
import { Dispatch, SetStateAction } from "react";

export enum Role {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  VIEWER = 'VIEWER',
  EMPLOYEE = 'EMPLOYEE',
  RECRUITER = 'RECRUITER',
  PEOPLE_MANAGER = 'PEOPLE_MANAGER',
  HIRING_MANAGER = 'HIRING_MANAGER',
  ONBOARDING_MANAGER = 'ONBOARDING_MANAGER',
  UNASSIGNED = 'UNASSIGNED'
}

export enum Status {
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
  user: User;
}

// export interface Session {
//   id: string;
//   sessionToken: string;
//   userId: string;
//   clientId: string;
//   clientUserId: string;
//   expires: Date;
//   user: User;
//   client: Client;
//   clientUser: ClientUser;
// }

export interface VerificationToken {
  identifier: string;
  token: string;
  expires: Date;
}

export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  emailVerified?: Date;
  password?: string;
  image?: string;
  userDomain?: string;
}

export interface Client {
  id: string;
  domain: string;
  companyName?: string;
  logo?: string;
  website?: string;
  description?: string;
  countryCode?: string;
  phoneNumber?: string;
  streetNo?: string;
  streetAddress?: string;
  province?: string;
  zipCode?: string;
  country?: string;
  user: ClientUser[];
}

export interface ClientUser {
  id: string;
  client: Client;
  clientId: string;
  user: User;
  userId: string;
  role: Role[];
}

export interface SigninBtnProps {
  onClick?: () => void;
}

export interface UserProps {
  session: Session | null;
  onClick?: () => void;
}

export interface FormData {
  image?: string;
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

export interface ClientFormData {
  domain: string;
  companyName: string;
  logo: string;
  website: string;
  description: string;
  countryCode: string;
  phoneNumber: string;
  streetNo: string;
  streetAddress: string;
  province: string;
  zipCode: string;
  country: string;
}

export interface ProfileFormProps {
  formData: FormData;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
  setFormData: Dispatch<SetStateAction<FormData>>;
  session: Session | null;
}

export interface DashboardFormProps {
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
  setFormData: Dispatch<SetStateAction<ClientFormData>>;
  formData: ClientFormData;
  // selectedCode: Dispatch<SetStateAction<string>>; 
  // selectedCountry: Dispatch<SetStateAction<string>>; 
}

export interface UserForm {
  session?: Session | null;
  formData: FormData;
}

export interface SidebarCompProps {
  userRoles: string[];
  session?: Session | null,
  onClick?: () => void;
}

export interface SidebarProps {
  session?: Session | null,
}

export interface UserCardProps {
  session?: Session | null, 
  onClick?: () => void;
  isMenuOpen?: boolean;
}

export interface UserInfo {
  user: User;
  formData: FormData;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
}

export interface AdminProps {
  session: Session;
  onClick?: () => void;
}

export interface TextParams {
  url: string;
  host: string;
}

export interface RoleBadgeProps {
  role: string;
  index: number;
  roles: Role[] | undefined;
}

export interface CloudinaryResponse {
  public_id: string;
  secure_url: string;
}

export interface Country {
  name: string;
  unicodeFlag: string;
  dialCode: string;
  currency: string;
}

export interface CommandInputProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface CodeSelectProps {
  onChange: (value: string) => void;
  value: string;
}

export interface FileInfo {
  name: string;
  preview: string;
}

// export interface EmailProvider {
//   server: nodemailer.TransportOptions;
//   from: string;
//   html: string;
// }

import { Transport, TransportOptions, createTransport } from "nodemailer"
import * as JSONTransport from "nodemailer/lib/json-transport/index.js"
import * as SendmailTransport from "nodemailer/lib/sendmail-transport/index.js"
import * as SESTransport from "nodemailer/lib/ses-transport/index.js"
import * as SMTPPool from "nodemailer/lib/smtp-pool/index.js"
import * as SMTPTransport from "nodemailer/lib/smtp-transport/index.js"
import * as StreamTransport from "nodemailer/lib/stream-transport/index.js"

type AllTransportOptions =
  | string
  | SMTPTransport
  | SMTPTransport.Options
  | SMTPPool
  | SMTPPool.Options
  | SendmailTransport
  | SendmailTransport.Options
  | StreamTransport
  | StreamTransport.Options
  | JSONTransport
  | JSONTransport.Options
  | SESTransport
  | SESTransport.Options
  | Transport<any>
  | TransportOptions


export type Awaitable<T> = T | PromiseLike<T>

export interface SendVerificationRequestParams {
  identifier: string;
  url: string;
  provider: EmailConfig;
}

export interface EmailConfig {
  server: AllTransportOptions;
  from: string;
  id: "email"
  type: "email"
  name: "Email"
  maxAge: number
  sendVerificationRequest: (
    params: SendVerificationRequestParams
  ) => Awaitable<void>
}

export interface DatePickerProps {
  label: string;
  selectedDate?: Date;
  onSelectDate: (date: Date) => void;
}

export interface ClientForm {
  domain: string;
  id?: string;
  companyName?: string;
  logo?: string;
  website?: string;
  description?: string;
  countryCode?: string;
  phoneNumber?: string;
  streetNo?: string;
  streetAddress?: string;
  province?: string;
  zipCode?: string;
  country?: string;
}

export interface SessionProps {
  session: Session;
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    userDomain: string;
    role: string[]
    clientId: string;
    userId: string;
    sessionToken: string;
    clientUserId: string;
    expires: Date;
    client: Client;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      image: string;
      userDomain: string;
    };
    clientUser: {
      clientId: string;
      role: string[];
    };
    companyName: string;
    website: string;
    description: string; 
    countryCode: string;
    streetNo: string;
    province: string;
    zipCode: string;
    country: string; 
    logo: string;
}

export interface TimeEntry {
  startTime: string;
  endTime: string;
  notes: string;
  timeZone: string;
  projectActivityId: string;
  day: DaySchedule;
  allProjects: allProjectsProps;
}

export interface ProjectProps {
  id: string;
  name: string;
  code: string;
  currency: string;
  customer: {
    id: string;
    name: string;
  };
  customerId: string;
  billingMethod: string;
  startDate: string;
  endDate: string;
};

export interface ActivityProps {
  chargable: boolean;
  id: string;
  name: string;
}

export interface ProjectActivityProps {
  projectId: string;
  projectName: string;
  id: string;
  activityId: string;
  activityName: string;
  chargable: boolean;
  timeReportId: string | null;
  projectActivityId: string;
}

export interface ProjectUserProps {
  approver: boolean;
  reviewer: boolean;
  endDate: string;
  startDate: string;
  rate: number;
  rateBy: string;
  userEmail: string;
  userId: string;
}

export interface ProjectUserCardProps {
  id: string;
  users: ProjectUserProps[];
  refreshActivities: () => Promise<void>;
}

export interface allProjectsProps {
  users: ProjectUserProps[];
  activities: ProjectActivityProps[];
  projects: ProjectProps[];
}

export interface TimeSheetProps {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  hours: number;
  timeZone: string;
  notes: string;
  status: string;
  userId: string;
  approverId: string;
  comment: string;
}

export interface DaySchedule {
  date: string;
  entries: TimeSheetProps[];
}

export interface WeeklyScheduleProps {
  allProjects: allProjectsProps;
  timeSheetData: TimeSheetProps[];
  day: DaySchedule
}

export interface WeekNavigatorProps {
  handlePreviousWeek: () => void;
  handleNextWeek: () => void;
  handleCurrentWeek: () => void;
  startDate: string;
  endDate: string;
  schedule: DaySchedule[];
};