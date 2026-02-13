export enum DriverStatus {
  IMPLEMENTED = 'IMPLEMENTED',
  IN_PROGRESS = 'IN_PROGRESS',
  PLANNED = 'PLANNED'
}

export interface DriverEvidence {
  type: 'code' | 'json' | 'log' | 'graph';
  title: string;
  content?: string; // For code, logs, or raw text
  data?: any; // For JSON objects or Graph data points
  language?: string;
}

export interface BusinessDriver {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string[];
  technicalDetails: string;
  metrics?: string;
  status: DriverStatus;
  icon: 'shield' | 'activity' | 'database' | 'lock' | 'cpu';
  evidence?: DriverEvidence[];
}

export interface TeamMember {
  name: string;
  role: string;
}

export interface SlideProps {
  id: string;
  className?: string;
}