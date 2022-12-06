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