import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { CloseIcon, Icon } from "@/components/ui/icon";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import React, { useState } from "react";
import { Box } from "./ui/box";
const Example = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Box className="bg-indicator-info py-5">
        <Text className="text-typography-0">This is the Box</Text>
      </Box>

      <Center>
        <Button onPress={() => setShowModal(true)}>
          <ButtonText>Show Modal</ButtonText>
        </Button>
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
          }}
          size="md"
        >
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader>
              <Heading size="md" className="text-typography-950">
                Invite your team
              </Heading>
              <ModalCloseButton>
                <Icon
                  as={CloseIcon}
                  size="md"
                  className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
                />
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <Text size="sm" className="text-typography-500">
                Elevate user interactions with our versatile modals. Seamlessly
                integrate notifications, forms, and media displays. Make an
                impact effortlessly.
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="outline"
                action="secondary"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button
                onPress={() => {
                  setShowModal(false);
                }}
              >
                <ButtonText>Explore</ButtonText>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Center>
    </>
  );
};

export default Example;
