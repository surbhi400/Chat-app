import React, { useState } from 'react';
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel,} from '@chakra-ui/react';
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [ show, setShow]= useState(false);
    const [name,setName]= useState();
    const [email,setEmail]= useState();
    const [confirmpassword,setConfirmpassword]= useState();
    const [password,setPassword]= useState();
    const [pic,setPic]= useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast()
    const navigate = useNavigate();

    const handleClick = () => setShow(!show);


    const postDetails= (pics) =>{
      setLoading(true);
      if(pics===undefined){
          toast({
          title: 'Please Slect an Image',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
      console.log(pics);
      if(pics.type==="image/jpeg" || pics.type==="image/png"){
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "chat-app");
        data.append("cloud_name", "de0gqm59w");
        
        fetch("https://api.cloudinary.com/v1_1/de0gqm59w/image/upload",{
          method:"POST",
          body:data,
        })
     .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  }; 
  const submitHandler = async () => {
  setLoading(true);

  if (!name || !email || !password || !confirmpassword) {
    toast({
      title: "Please Fill all the Fields",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });

    setLoading(false);
    return;
  }

  if (password !== confirmpassword) {
    toast({
      title: "Passwords Do Not Match",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });

    setLoading(false);
    return;
  }

  console.log(name, email, password, pic);

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/user", { name, email, password, pic }, config);

    console.log(data);

    toast({
      title: "Registration Successful",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
    setLoading(false);
    navigate('/chats'); // Updated navigation

  } catch (error) {
    toast({
      title: "Error Occurred!",
      description: error.response?.data?.message || "An error occurred. Please try again later.",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });

    setLoading(false);
  }
};

  return (
    <VStack spacing="5px">
      <FormControl id='first-name' isRequired>
        <FormLabel>Name</FormLabel>
            <Input
            placeholder="Enter Your Name"
            onChange={(e)=>setName(e.target.value)}
            />
      </FormControl>
      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
            <Input
            placeholder="Enter Your Email"
            onChange={(e)=>setEmail(e.target.value)}
            />
      </FormControl>
       <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
         <Input
            type={show? "text":"password"}
            placeholder="Enter Your password"
            onChange={(e)=>setPassword(e.target.value)}
        />
        <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show? "Hide" : "Show"}
            </Button>
        </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id='password' isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
         <Input
            type={show? "text":"password"}
            placeholder="Confirm password"
            onChange={(e)=>setConfirmpassword(e.target.value)}
        />
        <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show? "Hide" : "Show"}
            </Button>
        </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
        type="file"
        p={1.5}
        accept="image/*"// will accept only images
         onChange={(e) => postDetails(e.target.files[0])}// will take first element
        />
      </FormControl>
      <Button 
      colorScheme ="blue"
      width="100%"
      style={{marginTop:15 }}
      onClick={submitHandler}
      isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup