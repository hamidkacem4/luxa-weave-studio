export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio?: string;
  image: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "NAJAH FADHLOUN",
    position: "Chief Operating Officer",
    bio: "With over 15 years in textile and apparel manufacturing , NAJAH leads operations at Magtexco industrie, driving efficiency across the entire process to meet the highest industry standards .",
    image: "https://res.cloudinary.com/duqbe1hoq/image/upload/v1773750088/Gemini_Generated_Image_bzbqqabzbqqabzbq_fcw2vs.png?w=400&h=400&fit=crop",
    phone: "+216 22 848 981",
    email: "najah.fadhloun@thefactory.com.tn",
    whatsapp: "21622848981"
  },
  {
    id: "2",
    name: "WALID HORCHANI",
    position: "Merchandiser",
    bio: "WALID focuses on product development, sourcing, pricing, and ensuring the right products are available at the right time.",
    image: "https://res.cloudinary.com/duqbe1hoq/image/upload/v1773753214/Gemini_Generated_Image_1052q81052q81052_omjuuc.png?w=400&h=400&fit=crop",
    phone: "+216 95 518 870",
    email: "walid.horchani@thefactory.com.tn",
    whatsapp: "21624781706"
  },
    {
    id: "3",
    name: "HAMID KACEM",
    position: "IT Support & Systems",
    bio: "Hamid ensures our digital infrastructure runs seamlessly, supporting our smart manufacturing processes and global stakeholder coordination .",
    image: "https://res.cloudinary.com/duqbe1hoq/image/upload/v1773754053/ChatGPT_Image_Mar_17_2026_02_25_43_PM_zaabqr.png?w=400&h=400&fit=crop",
    phone: "+216 52 049 969",
    email: "hamidkacem4@gmail.com",
    whatsapp: "21652049969"
  },
  {
    id: "4",
    name: "REFKA ZAHI",
    position: "Merchandiser",
    bio: "REFKA focuses on product development, sourcing, pricing, and ensuring the right products are available at the right time.",
    image: "https://res.cloudinary.com/duqbe1hoq/image/upload/v1773750750/ChatGPT_Image_Mar_17_2026_01_32_10_PM_h6vofq.png?w=400&h=400&fit=crop",
    phone: "+216 23 299 521",
    email: "refka.zahi@thefactory.com.tn",
    whatsapp: "21623299521"
  },

  {
    id: "5",
    name: "MERYEM HILI",
    position: "Human Resources (HR)",
    bio: "MERYEM is responsible for managing employees, including hiring, training, payroll, and workplace relations.",
    image: "https://res.cloudinary.com/duqbe1hoq/image/upload/v1773754328/ChatGPT_Image_Mar_17_2026_02_31_39_PM_n60pbf.png?w=400&h=400&fit=crop",
    phone: "+216 29 759 469",
    email: "Myriam.hili@thefactory.com.tn",
    whatsapp: "21629759469"
  }
];
