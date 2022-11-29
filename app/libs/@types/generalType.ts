export interface INotionPost {
  cover?: string;
  title?: string;
  description?: string;
  slug: string;
  tags?: Tags;
  lastUpdatedAt: string;
  createdBy: INotionUser;
  createdAt: string;
  status: string;
  publishAt: string;
  lastUpdatedBy: INotionUser;
  views: number;
  id: string;
}

export interface INotionUser {
  object: string;
  id: string;
  name: string;
  avatar_url: string;
  type: string;
  person: INotionUserPerson;
}

export interface INotionUserPerson {
  email: string;
}

export interface INotionOriginalPost {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: CreatedBy;
  last_edited_by: LastEditedBy;
  cover: Partial<INotionFileUpload> & Partial<INotionFileExternal>;
  icon: any;
  parent: Parent;
  archived: boolean;
  properties: Properties;
  url: string;
}

export interface INotionFileUpload {
  name: string;
  type: string;
  file: {
    url: string;
  };
}

export interface INotionFileExternal {
  name: string;
  type: string;
  external: {
    url: string;
  };
}

export interface INotionText {
  id: string;
  type: string;
  rich_text: INotionRichText[];
}

export interface INotionRichText {
  type: string;
  text: INotionText;
  annotations: Annotations;
  plain_text: string;
  href: any;
}

export interface INotionViews {
  id: string;
  type: string;
  number: number;
}

/**
 * Raw
 */

export interface CreatedBy {
  object: string;
  id: string;
}

export interface LastEditedBy {
  object: string;
  id: string;
}

export interface Parent {
  type: string;
  database_id: string;
}

export interface Properties {
  tags: Tags;
  lastUpdatedAt: LastUpdatedAt;
  createdBy: CreatedBy2;
  title: INotionText;
  createdAt: CreatedAt;
  status: Status;
  publishAt: PublishAt;
  lastUpdatedBy: LastUpdatedBy;
  Name: Name;
  description: INotionText;
  slug: INotionText;
  views: INotionViews;
}

export interface Tags {
  id: string;
  type: string;
  multi_select: MultiSelect[];
}

export interface MultiSelect {
  id: string;
  name: string;
  color: string;
}

export interface LastUpdatedAt {
  id: string;
  type: string;
  last_edited_time: string;
}

export interface CreatedBy2 {
  id: string;
  type: string;
  created_by: INotionUser;
}

export interface Text {
  content: string;
  link: any;
}

export interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

export interface CreatedAt {
  id: string;
  type: string;
  created_time: string;
}

export interface Status {
  id: string;
  type: string;
  status: Status2;
}

export interface Status2 {
  id: string;
  name: string;
  color: string;
}

export interface PublishAt {
  id: string;
  type: string;
  date: Date;
}

export interface Date {
  start: string;
  end: any;
  time_zone: any;
}

export interface LastUpdatedBy {
  id: string;
  type: string;
  last_edited_by: INotionUser;
}

export interface Person2 {
  email: string;
}

export interface Name {
  id: string;
  type: string;
  title: Title2[];
}

export interface Title2 {
  type: string;
  text: Text2;
  annotations: Annotations2;
  plain_text: string;
  href: any;
}

export interface Text2 {
  content: string;
  link: any;
}

export interface Annotations2 {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}
