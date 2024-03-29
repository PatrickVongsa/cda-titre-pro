interface IActivity {
  id?: number;
  name: string;
  is_archived?: boolean;
}

interface IContact {
  id?: nummber;
  firstname: string;
  lastname: string;
  occupation: string;
  phone: string;
  email: string;
  is_prefered_contact: boolean;
  prospect_id: number;
  is_archived?: boolean;
}

interface IDaysOff {
  id?: number;
  start_date: Date;
  end_date: Date;
  days_off_status_id: nuumber;
  user_id: number;
  days_off_status?: IDaysOffStatus;
}

interface IDaysOffStatus {
  id?: number;
  name: string;
}

interface IDomain {
  id?: number;
  domain_name: string;
  created_at: Date;
  renew_at: Date;
  is_owner: boolean;
  account_name?: string;
  project_id: number;
  host_id: number;
  server_id: number | null;
  is_archived?: boolean;
  Subdomain?: ISubdomain[]
  host?: IHost
}

interface IEmergencyContact {
  id?: number;
  firstname: string;
  lastname: string;
  who_is: string;
  phone: string;
}

interface IEmergencyUser {
  user_id: number;
  emergency_contact_id: number;
}

interface IHost {
  id?: number;
  name: string;
  link: string;
  is_archived?: boolean;
}

interface IInteraction {
  id?: number;
  report: string;
  reported_by?: IUser;
  reported_by_id: number;
  reported_at: Date;
  prospect?: IProspect;
  prospect_id: number;
  modified_by?: IUser;
  modified_by_id?: number;
  modified_at?: Date;
  is_archived?: boolean;
}

interface IProspectStatus {
  id?: number;
  name: string;
  color: string;
  order_number: number;
  is_archived?: boolean;
}

interface IProspect {
  id?: number;
  company_name: string;
  address: string;
  postal_code: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  company_logo: string;
  website_url: string;
  facebook_url: string;
  instagram_url: string;
  linkedin_url: string;
  contacted_at: Date;
  estimate_budget: number;
  need_description: string;
  has_website: boolean;
  website_year: number;
  other_need: string;
  is_client: boolean;
  siret_number: string;
  assigned_to_id?: number;
  assigned_to?: IUser;
  prospect_status_id: number;
  prospect_status?: IProjectStatus;
  source_id: number;
  source?: ISource;
  activity_id: number;
  activity?: IActivity;
  is_archived?: boolean;
  interactions?: IInteraction[];
  contacts?: IContacts[];
}

interface IProjectStatus {
  id?: number;
  name: string;
}

interface IProjectType {
  id?: number;
  name: string;
}

interface IProject {
  id?: number;
  name: string;
  description: string;
  start_date: Date;
  due_date: Date;
  project_type_id: number;
  project_amount: number;
  did_deposit: boolean;
  has_financement: boolean;
  has_fully_paid: boolean;
  project_status_id: number;
  link?: string;
  github_link?: string;
  host?: string;
  ora_name?: string;
  prospect_id: number | null;
  project_status?: IProjectStatus;
  project_type?: IProjectType;
  Domain?: IDomain[]
  Server?: IServer[]
}

interface IProjectUser {
  project_id: number;
  user_id: number;
}

interface ISource {
  id?: number;
  name: string;
  is_archived?: boolean;
}

interface IServer {
  id?: number;
  name: string;
  created_at: Date;
  renew_at: Date;
  is_owner: boolean;
  account_name?: string;
  project_id: number;
  host_id: number;
  is_dev: boolean;
  is_prod: boolean;
  ipv4: string;
  ipv6: string;
  sftp: string;
  ssh: string;
  bdd_host_name: string;
  server_type_id: number;
  is_archived?: boolean;
}

interface IServerType {
  id?: number;
  name: string;
  is_archived?: boolean;
}

interface ISubdomain {
  id?: number;
  name: string;
  domain_id: number;
  server_id: number | null;
  is_archived?: boolean;
}

interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  address: string;
  postal_code: string;
  city: string;
  phone: string;
  occupation: string;
  contrat_type: string;
  is_archived?: boolean;
  email: string;
  password?: string;
}

interface ITabMenu {
  id: number;
  name: string;
}
