export type Education = {
  id: string;
  institution: string;
  degree: string;
  period: string;
  location?: string;
  focus?: string;
  status?: string;
  current?: boolean;
};

// Newest first.
export const education: readonly Education[] = [
  {
    id: "orchid-bsc-csit",
    institution: "Orchid International College",
    degree: "Bachelor of Science in Computer Science and Information Technology",
    period: "2022 - 2026",
    location: "Kathmandu, Nepal",
    focus: "Tribhuvan University (TU) • Software Engineering & Algorithms",
    status: "Graduated",
  },
  {
    id: "st-lawrence-high-school",
    institution: "St. Lawrence College",
    degree: "+2 Science (Higher Secondary)",
    period: "2019 - 2022",
    location: "Kathmandu, Nepal",
    focus: "National Examination Board • Computer Science & Physics",
  },
  {
    id: "centennial-see",
    institution: "Centennial Secondary School",
    degree: "Secondary Education Examination (SEE)",
    period: "2006 - 2019",
    location: "Kathmandu, Nepal",
    focus: "Board of Secondary Education • Science & Mathematics",
  },
];