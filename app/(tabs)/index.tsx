import { Image } from "expo-image";
import { Platform, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Toast, ToastDescription, ToastTitle, useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardScreen() {
  const { logout } = useAuth();
  const toast = useToast();

  const handleLogout = async () => {
    await logout();
    toast.show({
      render: ({ id }) => {
        return (
          <Toast nativeID={id} action="info" variant="solid">
            <ToastTitle>Logged Out</ToastTitle>
            <ToastDescription>You have been successfully logged out</ToastDescription>
          </Toast>
        );
      },
    });
    // The navigation will be handled automatically by the useEffect in _layout.tsx
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Dashboard</ThemedText>
        <ThemedText type="subtitle">Welcome to your dashboard!</ThemedText>
      </ThemedView>

      <Center className="px-4 py-6">
        <VStack space="xl" className="w-full max-w-96">
          <VStack space="md">
            <Heading size="2xl" className="text-center">
              Welcome Back!
            </Heading>
            <Text size="lg" className="text-center">
              You have successfully logged in with the credentials:
            </Text>
            <Box className="bg-secondary-200 p-4 rounded-lg w-full">
              <VStack space="sm">
                <Text size="sm" bold>
                  Username: krishnamodi
                </Text>
                <Text size="sm" bold>
                  Password: Admin@123
                </Text>
              </VStack>
            </Box>
          </VStack>

          <VStack space="md">
            <Text size="md" className="text-center">
              This is your protected dashboard area. You can only see this page
              after successful authentication.
            </Text>

            <Button onPress={handleLogout} action="negative">
              <ButtonText>Logout</ButtonText>
            </Button>
          </VStack>

          <VStack space="md">
            <ThemedText type="subtitle">Step 1: Try it</ThemedText>
            <ThemedText>
              Edit{" "}
              <ThemedText type="defaultSemiBold">
                app/(tabs)/index.tsx
              </ThemedText>{" "}
              to see changes. Press{" "}
              <ThemedText type="defaultSemiBold">
                {Platform.select({
                  ios: "cmd + d",
                  android: "cmd + m",
                  web: "F12",
                })}
              </ThemedText>{" "}
              to open developer tools.
            </ThemedText>
          </VStack>

          <VStack space="md">
            <ThemedText type="subtitle">Step 2: Explore</ThemedText>
            <ThemedText>
              {`Tap the Explore tab to learn more about what's included in this starter app.`}
            </ThemedText>
          </VStack>

          <VStack space="md">
            <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
            <ThemedText>
              {`When you're ready, run `}
              <ThemedText type="defaultSemiBold">
                npm run reset-project
              </ThemedText>{" "}
              to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
              directory. This will move the current{" "}
              <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
              <ThemedText type="defaultSemiBold">app-example</ThemedText>.
            </ThemedText>
          </VStack>
        </VStack>
      </Center>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
