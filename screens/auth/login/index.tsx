import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { z } from "zod";

// Zod validation schema
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const { login } = useAuth();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const success = await login(data.username, data.password);
      if (success) {
        toast.show({
          placement: "top",
          render: ({ id }) => {
            return (
              <Toast nativeID={id} action="success" variant="solid">
                <ToastTitle>Success!</ToastTitle>
                <ToastDescription>
                  Welcome back! Redirecting to dashboard...
                </ToastDescription>
              </Toast>
            );
          },
        });
      } else {
        toast.show({
          placement: "top",

          render: ({ id }) => {
            return (
              <Toast nativeID={id} action="error" variant="solid">
                <ToastTitle>Login Failed</ToastTitle>
                <ToastDescription>
                  Invalid username or password
                </ToastDescription>
              </Toast>
            );
          },
        });
      }
      // Navigation will be handled automatically by the useEffect in _layout.tsx
    } catch (error) {
      toast.show({
        render: ({ id }) => {
          return (
            <Toast nativeID={id} action="error" variant="solid">
              <ToastTitle>Error</ToastTitle>
              <ToastDescription>
                An error occurred during login
              </ToastDescription>
            </Toast>
          );
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Center className="flex-1 px-4">
        <VStack space="xl" className="w-full max-w-96">
          <VStack space="md" className="items-center">
            <Heading size="2xl" className="text-center">
              Welcome Back
            </Heading>
            <Text size="md" className="text-center text-gray-500">
              Sign in to your account
            </Text>
          </VStack>

          <VStack space="md">
            <VStack space="sm">
              <Text size="sm" bold>
                Username
              </Text>
              <Controller
                control={control}
                name="username"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input>
                    <InputField
                      placeholder="Enter your username"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </Input>
                )}
              />
              {errors.username && (
                <Text size="sm" className="text-error-500">
                  {errors.username.message}
                </Text>
              )}
            </VStack>

            <VStack space="sm">
              <Text size="sm" bold>
                Password
              </Text>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input>
                    <InputField
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <InputSlot className="web:pr-3" onPress={handleState}>
                      <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                    </InputSlot>
                  </Input>
                )}
              />
              {errors.password && (
                <Text size="sm" className="text-error-500">
                  {errors.password.message}
                </Text>
              )}
            </VStack>

            <Button
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}
              className="mt-4"
            >
              <ButtonText>{isLoading ? "Signing in..." : "Sign In"}</ButtonText>
            </Button>
          </VStack>

          <VStack space="sm" className="items-center">
            <Text size="sm" className="text-center text-gray-500">
              Demo Credentials:
            </Text>
            <Text size="sm" className="text-center text-gray-500">
              Username: krishnamodi
            </Text>
            <Text size="sm" className="text-center text-gray-500">
              Password: Admin@123
            </Text>
          </VStack>
        </VStack>
      </Center>
    </ScrollView>
  );
};

export default Login;
