import type { NextPage } from "next";
import { Flex, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Logo } from "../../components/alibum";
import { login } from "../../libs/firebase/auth";
import { auth } from "../../libs/firebase/init";

const Login: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    const authStateChanged = onAuthStateChanged(auth, async (u) => {
      if (u) {
        await router.push("/");
      } else {
        await router.push("/login");
      }
    });
    return () => {
      authStateChanged();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onClick = (): void => {
    login();
  };
  return (
    <Flex
      as="main"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      bgColor="background.500"
      px={{ base: "12", lg: "25%" }}
    >
      <Logo
        width={{ base: "8.53125rem", md: "11.375rem", lg: "17.0625rem" }}
        height={{ base: "4.6875rem", md: "6.25rem", lg: "9.375rem" }}
        pb={{ base: "4", md: "9" }}
      />
      <Text
        as="b"
        fontSize={{ base: "xs", md: "xl" }}
        pb={{ base: "28", md: "64" }}
      >
        日頃の感謝でサプライズをしよう
      </Text>
      <Button
        colorScheme="extra"
        borderRadius="2xl"
        px="4"
        color="white"
        fontSize="1.25rem"
        onClick={onClick}
      >
        login
      </Button>
    </Flex>
  );
};

export default Login;
