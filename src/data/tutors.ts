export interface Tutor {
  id: string;
  fullName: string;
  qualification: string;
  university: string;
  subjects: string[];
  experience: number;
  city: string;
  area: string;
  expectedSalary: number;
  bio: string;
  rating: number;
  gender: string;
}

export const sampleTutors: Tutor[] = [
  {
    id: "1",
    fullName: "Rahim Ahmed",
    qualification: "BSc in Mathematics",
    university: "University of Dhaka",
    subjects: ["Mathematics", "Physics"],
    experience: 4,
    city: "Dhaka",
    area: "Mirpur",
    expectedSalary: 4000,
    bio: "Experienced mathematics tutor for SSC and HSC students.",
    rating: 4.9,
    gender: "Male",
  },
  {
    id: "2",
    fullName: "Nusrat Jahan",
    qualification: "MSc in English",
    university: "Jahangirnagar University",
    subjects: ["English", "Bangla"],
    experience: 3,
    city: "Dhaka",
    area: "Dhanmondi",
    expectedSalary: 3500,
    bio: "Passionate English teacher with three years of experience.",
    rating: 4.8,
    gender: "Female",
  },
  {
    id: "3",
    fullName: "Sakib Hasan",
    qualification: "BSc in Chemistry",
    university: "University of Rajshahi",
    subjects: ["Chemistry", "Biology"],
    experience: 5,
    city: "Dhaka",
    area: "Uttara",
    expectedSalary: 5000,
    bio: "Specialized in science subjects for SSC and HSC students.",
    rating: 4.7,
    gender: "Male",
  },
  {
    id: "4",
    fullName: "Ayesha Rahman",
    qualification: "BSc in Physics",
    university: "University of Dhaka",
    subjects: ["Physics", "Mathematics"],
    experience: 2,
    city: "Dhaka",
    area: "Mohammadpur",
    expectedSalary: 3000,
    bio: "Friendly tutor focused on building strong academic foundations.",
    rating: 4.6,
    gender: "Female",
  },
];