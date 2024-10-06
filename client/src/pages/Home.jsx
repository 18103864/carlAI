import React from 'react'
import styled from 'styled-components'
import SearchBar from '../components/SearchBar';
import ImageCard from '../components/ImageCard';



const Container = styled.div`
  height:100%;
  overflow-y: scroll;
  background: ${({theme}) => theme.bg}
  padding: 30px 30px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  @media (max-width: 768px){
    padding: 6px 10px;
  }
`;

const Headline = styled.div`
  font-size: 34px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (max-width: 600px) {
    font-size: 22px;
  }
`;

const Span = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.secondary};

  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 32px 0px;
  display: flex;
  justify-content: center;
`;

const CardWrapper = styled.div`
  display: grid;
  gap: 20px;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  
  @media (min-width: 640px) and (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 639px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Home = () => {
  const item = {
    photo: "data:image/jpeg;base64,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",
    author: "Carl",
    prompt: "Wassup G",
  }
  return (
    <Container>
      <Headline>
        Explore Popular Posts in the Community!
        <Span>► Generated with AI ◄</Span>
      </Headline>
      <SearchBar/>
      <Wrapper>
        <CardWrapper>
          <ImageCard item={item} />
          <ImageCard item={item} />
          <ImageCard item={item} />
          <ImageCard item={item} />
          <ImageCard item={item} />
          <ImageCard item={item} />
          <ImageCard item={item} />
        </CardWrapper>
      </Wrapper>
    </Container>
  )
}

export default Home