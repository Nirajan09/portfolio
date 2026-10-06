export type Education = {
  id: string;
  institution: string;
  degree: string;
  period: string;
};

// Newest first.
export const education: readonly Education[] = [
  {
    id: "orchid-bsc-csit",
    institution: "Orchid International College",
    degree: "Bachelor of Science in Computer Science and Information Technology",
    period: "2022 - 2026",
  },
  {
    id: "st-lawrence-high-school",
    institution: "St. Lawrence College",
    degree: "High School",
    period: "2019 - 2022",
  },
  {
    id: "centennial-see",
    institution: "Centennial Secondary School",
    degree: "Secondary Education Examination",
    period: "2006 - 2019",
  },
];