import propTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import CookieConsent from 'react-cookie-consent';
import Header from './Header';
import Footer from './Footer';

const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: 'radnika_next';
  src: url ("/static/radnikanext-medium-webfont.woff2")
  format('woff2');
  font-weight: normal;
  font-style: normal;
}
  html {
    --red: #ff0000;
    --black: #393939;
    --grey: #3a3a3a;
    --gray : var(--grey);
    --lightGrey: #e1e1e1;
    --lightGray: var(--lightGrey);
    --offWhite: #ededed;
    --max-width: 100px;
    --bs: 0 12px 24px 0 rgba(0, 0,0,0.0.09);
    box-sizing: border-box;
    font-size: 10px;
    
  }
  *, *::before, *:after {
    box-sizing: inherit;
  }
  body {
    font-family: 'radnika_next', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    min-width: 100vw;
    min-height: 100vh;
  }
  a {
    text-decoration: none;
    color: var(--black);
  }
  a:hover {
    text-decoration: underline;
  }
  button {
    font-family: 'radnika_next', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0;
  padding: 3rem;
`;
// it did not work when these styles were added to the body, so a new div was added
const MainStyles = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vw;
  margin: 0;
  padding: 0;
`;

export default function Page({ children }) {
  return (
    <div>
      <GlobalStyles />
      <MainStyles>
        <Header />
        <InnerStyles>{children}</InnerStyles>
        <Footer />
        <CookieConsent
          location="bottom"
          buttonText="got it"
          cookieName="ConsentCookie"
          style={{ background: 'black' }}
          buttonStyle={{
            background: 'white',
            color: 'black',
            fontSize: '16px',
            borderRadius: '4px',
          }}
          expires={150}
        >
          This website uses cookies only to enhance the user experience.
        </CookieConsent>
      </MainStyles>
    </div>
  );
}

Page.propTypes = {
  children: propTypes.any,
};
