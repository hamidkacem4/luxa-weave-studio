import type { StaticImageData } from "next/image";
import najahImage from "@/assets/najah.png";
import walidImage from "@/assets/walid.png";
import hamidImage from "@/assets/hamid.png";
import refkaImage from "@/assets/refka.png";
import meryemImage from "@/assets/meryem.png";

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio?: string;
  image: string | StaticImageData;
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
    image: najahImage,
    phone: "+216 22 848 981",
    email: "najah.fadhloun@thefactory.com.tn",
    whatsapp: "21622848981"
  },
  {
    id: "2",
    name: "WALID HORCHANI",
    position: "Merchandiser",
    bio: "WALID focuses on product development, sourcing, pricing, and ensuring the right products are available at the right time.",
    image: walidImage,
    phone: "+216 95 518 870",
    email: "walid.horchani@thefactory.com.tn",
    whatsapp: "21624781706"
  },
    {
    id: "3",
    name: "HAMID KACEM",
    position: "IT Support & Systems",
    bio: "Hamid ensures our digital infrastructure runs seamlessly, supporting our smart manufacturing processes and global stakeholder coordination .",
    image: hamidImage,
    phone: "+216 52 049 969",
    email: "hamidkacem4@gmail.com",
    whatsapp: "21652049969"
  },
  {
    id: "4",
    name: "REFKA ZAHI",
    position: "Merchandiser",
    bio: "REFKA focuses on product development, sourcing, pricing, and ensuring the right products are available at the right time.",
    image: refkaImage,
    phone: "+216 23 299 521",
    email: "refka.zahi@thefactory.com.tn",
    whatsapp: "21623299521"
  },

  {
    id: "5",
    name: "MERYEM HILI",
    position: "Human Resources (HR)",
    bio: "MERYEM is responsible for managing employees, including hiring, training, payroll, and workplace relations.",
    image: meryemImage,
    phone: "+216 29 759 469",
    email: "Myriam.hili@thefactory.com.tn",
    whatsapp: "21629759469"
  }
];
