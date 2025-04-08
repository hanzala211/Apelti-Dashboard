import { PageHeading } from '@components';

export const PageNotFound: React.FC = () => {
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <PageHeading label="Page Not Found" />
    </section>
  );
};

export default PageNotFound;
