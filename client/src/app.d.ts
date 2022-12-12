interface IActivity {
  id?: number;
  name: string;
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
  piste_status_id: number;
  prospect_status?: IProjectStatus;
  source_id: number;
  source?: ISource;
  activity_id: number;
  activity?: IActivity;
  is_archived?: boolean;
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
}

interface ISource {
  id?: number;
  name: string;
  is_archived?: boolean;
}
