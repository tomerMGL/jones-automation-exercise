export const validDefaults = {
  name: "tomer gaziel",
  email: "gaziel.t55@gmail.com",
  phone: "055-6618881",
  company: "Jones",
  website: "https://getjones.com",
  employees: '51-500'
};

export interface FieldTestCase {
  field: keyof typeof validDefaults;
  value: string;
  expectedValid: boolean;
  description: string;
}

export const fieldTestCases: FieldTestCase[] = [
  // Name
  {
    field: "name",
    value: "",
    expectedValid: false,
    description: "name empty (required field)",
  },
  {
    field: "name",
    value: "Jane Smith",
    expectedValid: true,
    description: "name valid input",
  },

  // Email
  {
    field: "email",
    value: "",
    expectedValid: false,
    description: "email empty (required field)",
  },
  {
    field: "email",
    value: "notanemail",
    expectedValid: false,
    description: "email missing @ symbol",
  },
  {
    field: "email",
    value: "missing@domain",
    expectedValid: false,
    description: "email missing TLD",
  },
  {
    field: "email",
    value: "valid@example.com",
    expectedValid: true,
    description: "email valid format",
  },

  // Phone
  {
    field: "phone",
    value: "",
    expectedValid: false,
    description: "phone empty (required field)",
  },
  {
    field: "phone",
    value: "abcdefg",
    expectedValid: false,
    description: "phone non-numeric input",
  },
  {
    field: "phone",
    value: "054-1234567",
    expectedValid: true,
    description: "phone valid format",
  },
];
