/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import Page from '../../components/Page';
import { SocialLinks } from '../../components/SocialLinks';

const ContactPage: NextPage = () => {
  return (
    <Page
      commentsConfig={{
        url: '/contact/',
        identifier: '/contact/',
        title: 'Contact',
      }}
      title="Contact"
    >
      <h1>Contact</h1>
      <div className="center">
        If you have any questions, suggestions, or comments, you can send an
        email to the following address:
        <br />
        <br />
        <img
          width="400"
          height="110"
          alt="j e f f - s k r a t c h d o t . c o m"
          title="j e f f - s k r a t c h d o t . c o m"
          src="/images/email.png"
          style={{ border: 0 }}
        />
        <br />
        <br />
        Or you can follow me:
        <br />
        <br />
        <div>
          <SocialLinks />
        </div>
        <br />
        <br />
        You can also comment publicly below:
      </div>
    </Page>
  );
};

export default ContactPage;
