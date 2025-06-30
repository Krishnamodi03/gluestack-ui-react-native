import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React from "react";
import { ActivityIndicator } from "react-native";

export const LoadingScreen = () => {
  return (
    <Center className="flex-1">
      <VStack space="md">
        <ActivityIndicator size="large" color="#007AFF" />
        <Text size="md">Loading...</Text>
      </VStack>
    </Center>
  );
};
