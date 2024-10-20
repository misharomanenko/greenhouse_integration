export interface PhoneNumber {
  value: string;
  type: string;
}

export interface Address {
  value: string;
  type: string;
}

export interface EmailAddress {
  value: string;
  type: string;
}

export interface WebsiteAddress {
  value: string;
  type: string;
}

export interface SocialMediaAddress {
  value: string;
}

export interface Education {
  school_id: number;
  discipline_id: number;
  degree_id: number;
  start_date: string;
  end_date: string;
}

export interface Employment {
  company_name: string;
  title: string;
  start_date: string;
  end_date: string;
}

export interface Application {
  job_id: number;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  company: string;
  title: string;
  is_private: boolean;
  phone_numbers: PhoneNumber[];
  addresses: Address[];
  email_addresses: EmailAddress[];
  website_addresses: WebsiteAddress[];
  social_media_addresses: SocialMediaAddress[];
  educations: Education[];
  employments: Employment[];
  tags: string[];
  applications: Application[];
}

export const currentUser: User = {
  id: 1234567890,
  first_name: "John",
  last_name: "Locke",
  company: "The Tustin Box Company",
  title: "Customer Success Representative",
  is_private: false,
  phone_numbers: [
    {
      value: "555-1212",
      type: "mobile"
    }
  ],
  addresses: [
    {
      value: "123 Fake St.",
      type: "home"
    }
  ],
  email_addresses: [
    {
      value: "john.locke+work@example.com",
      type: "work"
    },
    {
      value: "john.locke@example.com",
      type: "personal"
    }
  ],
  website_addresses: [
    {
      value: "johnlocke.example.com",
      type: "personal"
    }
  ],
  social_media_addresses: [
    {
      value: "linkedin.example.com/john.locke"
    },
    {
      value: "@johnlocke"
    }
  ],
  educations: [
    {
      school_id: 459,
      discipline_id: 940,
      degree_id: 1230,
      start_date: "2001-09-15T00:00:00.000Z",
      end_date: "2004-05-15T00:00:00.000Z"
    }
  ],
  employments: [
    {
      company_name: "Greenhouse",
      title: "Engineer",
      start_date: "2012-08-15T00:00:00.000Z",
      end_date: "2016-05-15T00:00:00.000Z"
    }
  ],
  tags: [
    "Walkabout",
    "Orientation"
  ],
  applications: [] 
};
