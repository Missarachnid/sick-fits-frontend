import styled from 'styled-components';

const FooterStyles = styled.footer`
  display: grid;
  grid-template-columns: repeat(3, auto);
  padding: 0;
  justify-items: center;
  border-top: 5px solid black;
  margin-top: auto;
  a {
    font-size: 1.8rem;
    padding-top: 10px;
  }
  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
  }
`;

export default function Footer() {
  return (
    <FooterStyles>
      <a
        href="https://advancedreact.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Advanced React Project from Wes Bos
      </a>
      <a href="https://mmkepler.com" target="_blank" rel="noopener noreferrer">
        mmkepler.com
      </a>
      <a
        href="https://github.com/Missarachnid/sick-fits-frontend"
        target="_blank"
        rel="noreferrer"
      >
        <img src="/static/GitHub-Mark-32px.png" alt="The GitHub Octocat" />
      </a>
    </FooterStyles>
  );
}
