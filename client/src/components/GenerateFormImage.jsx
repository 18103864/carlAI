import React, { useState } from 'react'
import styled from 'styled-components'
import Button from './buttons';
import TextInput from './TextInput';
import { AutoAwesome, CreateRounded } from '@mui/icons-material';
import { CreatePost, GenerateAIImage } from '../api';
import { useNavigate } from "react-router-dom";

const Form = styled.div`
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 9%;
  justify-content: center;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.div`
  font-size: 17px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const Actions = styled.div`
  flex: 1;
  display: flex;
  gap: 8px;
`;

const GenerateFormImage = ({
    post,
    setPost,
    createPostLoading,
    generateImageLoading,
    setCreatePostLoading,
    setGenerateImageLoading,
}) => {

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const generateImageFunc = async () => {
        setGenerateImageLoading(true);
        await GenerateAIImage({prompt: post.prompt}).then((res) => {
          setPost({...post, photo: res?.data?.photo})
          setGenerateImageLoading(false);
        })
        .catch((error) => {
          setError(error?.response?.data?.message || "An error occurred while generating the image.");
          setGenerateImageLoading(false);
        });
    };

    const createPostFunc = async () => {
        setCreatePostLoading(true);
        await CreatePost(post).then((res) => {
          setCreatePostLoading(false);
          navigate("/");
        })
        .catch((error) =>{
          setError(error?.response?.data?.message || "An unexpected error occurred while creating the post.");
          setCreatePostLoading(false);
        })
    };   

  return (
    <Form>
        <Top>
            <Title>Generate Image with CARL-AI</Title>
            <Desc>Write Your Prompt</Desc>
        </Top>
        <Body>
            <TextInput 
                label="Author" 
                placeholder="Enter your name" 
                name="name"
                value={post.name}
                handelChange={(e)=>setPost({...post, name: e.target.value})}
            />
            <TextInput 
                label="Image Prompt" 
                placeholder="Write your image prompt..." 
                name="name"
                rows="8"
                textArea
                value={post.prompt}
                handelChange={(e)=>setPost({...post, prompt: e.target.value})}
            />
            {error && <div style={{ color: "red" }}>{error}</div>}
            ** You can post the AI generated Image to the Community
        </Body>
        <Actions>
            <Button 
                text="Generate Image" 
                flex 
                leftIcon={<AutoAwesome/>}
                isLoading={generateImageLoading}
                isDisabled={post.prompt === ""}
                onClick={()=>generateImageFunc()}
            />
            <Button 
                text="Post Image" 
                flex 
                type="secondary" 
                leftIcon={<CreateRounded/>}
                isLoading={createPostLoading}
                isDisabled={post.name === "" || post.prompt === "" || post.photo === ""}
                onClick={()=>createPostFunc()}
            />
        </Actions>
    </Form>
  )
}

export default GenerateFormImage