import RecruitmentPage, {
  generateMetadata as generateRecruitmentMetadata,
} from "../[locale]/recruitment/page";

export const generateMetadata = () =>
  generateRecruitmentMetadata({ params: { locale: "en" } });

export default function RecruitmentRootPage() {
  return <RecruitmentPage params={{ locale: "en" }} />;
}
