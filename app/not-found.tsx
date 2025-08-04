import { Box, Button, Flex, Text, Title } from "@mantine/core";
import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
};

const NotFound = () => {
  return (
    <Box ta="center" py="xl" component="section">
      <Title order={1} mb="20" ta="center">
        404 - Page Not Found
      </Title>

      <Text mb="xl" c="dimmed">
        Oops! The page you're looking for doesn't exist.
      </Text>

      <Text mb="md">
        It looks like this page has wandered off, just like that favorite sock
        that disappears in the laundry.
      </Text>
      <Text mb="xl">
        Don't worry though, you can always find your way back home. 🌻
      </Text>

      <Flex gap="md" justify="center" wrap="wrap">
        <Button component={Link} href="/">
          Back to Home
        </Button>
        <Button component={Link} href="/about" variant="outline">
          About
        </Button>
        <Button component={Link} href="/contact" variant="outline">
          Contact
        </Button>
      </Flex>
    </Box>
  );
};

export default NotFound;
