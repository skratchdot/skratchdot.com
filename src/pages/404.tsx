import type { NextPage } from 'next';
import Page from '../components/Page';
import styles from './404.module.css';

const ErrorPage: NextPage = () => {
  return (
    <Page pageClassName={styles.ErrorPage} title="Page Not Found">
      <h3 className={styles.WhiteText}>Error 404 - Not Found</h3>
      <h4 className={styles.WhiteText}>
        Sorry, the page that you are looking for does not exist.
      </h4>
    </Page>
  );
};

export default ErrorPage;
