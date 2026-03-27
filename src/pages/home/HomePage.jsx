import Container from '@/components/ui/Container';
import CategoryGridSection from '@/features/home/components/CategoryGridSection';
import CompanyStripSection from '@/features/home/components/CompanyStripSection';
import HeroSection from '@/features/home/components/HeroSection';
import WorkflowSection from '@/features/home/components/WorkflowSection';
import useHomePageContent from '@/hooks/useHomePageContent';

export default function HomePage() {
  const content = useHomePageContent();

  return (
    <div className="pb-16 pt-8 sm:pb-20 sm:pt-10">
      <Container>
        <HeroSection content={content.hero} />
      </Container>

      <Container className="mt-16 sm:mt-20">
        <WorkflowSection content={content.workflow} />
      </Container>

      <Container className="mt-16 sm:mt-20">
        <CategoryGridSection content={content.categories} />
      </Container>

      <Container className="mt-16 sm:mt-20">
        <CompanyStripSection content={content.companies} />
      </Container>
    </div>
  );
}
