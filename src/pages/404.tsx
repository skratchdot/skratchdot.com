import type { NextPage } from 'next';
import Page from '../components/Page';
import { SITE_URL } from '../constants/site';

const whitePageStyles = {
  color: '#fff',
};

const ErrorPage: NextPage = () => {
  return (
    <Page
      pageClassName="ErrorPage_404"
      title="Page Not Found"
      canonical={`${SITE_URL}/404`}
    >
      <h3 style={whitePageStyles}>Error 404 - Not Found</h3>
      <h4 style={whitePageStyles}>
        Sorry, the page that you are looking for does not exist.
      </h4>
    </Page>
  );
};

export default ErrorPage;
