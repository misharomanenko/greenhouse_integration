interface PhoneNumber {
  value: string;
  type: 'mobile' | 'home' | 'work';
}

interface Address {
  value: string;
  type: 'home' | 'work'; 
}

interface EmailAddress {
  value: string;
  type: 'personal' | 'work';
}

interface WebsiteAddress {
  value: string;
  type: 'personal' | 'company' | 'portfolio';
}

interface SocialMediaAddress {
  value: string;
}

interface Employment {
  company_name: string;
  title: string;
  start_date: string;
  end_date: string;
}

interface User {
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
  employments: Employment[];
  applications: any[];
  educations: any[];
  tags: string[];
}

export const currentUser: User = {
  id: 34555007007,
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
  employments: [
    {
      company_name: "Greenhouse",
      title: "Engineer", 
      start_date: "2012-08-15T00:00:00.000Z",
      end_date: "2016-05-15T00:00:00.000Z"
    }
  ],
  applications: [],
  educations: [],
  tags: []
};