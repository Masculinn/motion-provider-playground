﻿import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { FC, useState } from "react";
import { CircleX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PlaygroundConfigProps } from "@/interfaces/@types-components";
import Player from "../player";

const PlaygroundConfiguration: FC<PlaygroundConfigProps> = ({
  animation,
  isModalOpen,
  setIsMobileOpen,
  delayLogic,
  onDelayLogicChange,
  onAnimationChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const handleClose = () => setIsOpen(false);

  return (
    <Dialog modal onOpenChange={setIsMobileOpen} open={isModalOpen}>
      <DialogContent
        className="sm:max-w-5xl border-none bg-transparent backdrop-blur-lg"
        aria-describedby="modal-content"
      >
        <DialogTitle className="sr-only">Configure your animation</DialogTitle>
        <Player
          animation={animation}
          onAnimationChange={onAnimationChange}
          onDelayLogicChange={onDelayLogicChange}
          delayLogic={delayLogic}
        />
        {isOpen && (
          <DialogFooter className="text-xs w-full -mt-8 px-6">
            <Alert className="w-full dark bg-transparent">
              <Button
                variant="ghost"
                className="absolute top-1 right-1 z-50"
                onClick={handleClose}
              >
                <CircleX className="size-5" />
              </Button>
              <AlertTitle>Use Shortcuts</AlertTitle>
              <AlertDescription className="inline justify-center text-xs">
                Configure your dream animation in seconds, use your keyboard's
                accessibility{" "}
                <Badge variant={"outline"}>
                  <pre>TAB</pre>
                </Badge>{" "}
                ,switch to fullscreen mode{" "}
                <Badge variant={"outline"}>
                  <pre>F11</pre>
                </Badge>{" "}
                for lightning-fast editing and better experience.
              </AlertDescription>
            </Alert>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PlaygroundConfiguration;
