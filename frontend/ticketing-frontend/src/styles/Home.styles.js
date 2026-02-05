import styled from "styled-components";

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  background: linear-gradient(
    135deg,
    #7a738f 0%,
    #686278 45%,
    #4e495f 100%
  );
`;

export const CenterContainer = styled.div`
  width: 100%;
  max-width: 960px;
  min-height: 620px;
  display: flex;

  background: #2c2638;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
  overflow: hidden;
`;

export const LeftSection = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
`;

export const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  padding: 40px;
  padding-top: 80px;
  overflow-y: auto;
  & > div {
    width: 100%;
    max-width: 420px;
    color: #ffffff;
    font-family: "Mona Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  h1 {
    font-size: 32px;
    font-weight: 400;
    line-height: 40px;
    margin-bottom: 12px;
  }

  p {
    font-size: 16px;
    line-height: 28px;
    color: #b5b3c3;
    margin-bottom: 32px;
  }

  a {
    display: inline-block;
    font-size: 16px;
    line-height: 28px;
    font-weight: 400;
    margin-bottom: 16px;
    color: #ffffff;
    opacity: 0.9;

    &:hover {
      opacity: 1;
      text-decoration: underline;
    }
  }
`;
