import { PlayerController } from "./controller";
import { PlayerViewer } from "./viewer";
import { FC } from "react";
import { interFont } from "@/lib/fonts";
import { PlayerConfiguration } from "./configuration";
import {
  PlaygroundConfigurationProps,
  PlaygroundPlayerProps,
} from "@/interfaces/@types-components";

const Player: FC<
  PlaygroundPlayerProps & Omit<PlaygroundConfigurationProps, "className">
> = ({ animation, onAnimationChange, delayLogic, onDelayLogicChange }) => {
  return (
    <div
      className={`w-full ${interFont.className} max-h-[500px] rounded-2xl p-6 bg-transparent`}
    >
      <div className="size-full flex flex-row gap-2">
        <PlayerController
          animation={animation}
          onAnimationChange={onAnimationChange}
          className="w-2/5 h-full"
        />
        <div className="w-3/5 h-full flex flex-col gap-2">
          <PlayerViewer
            animation={animation}
            className="h-2/3 w-full"
            delayLogic={delayLogic}
          />
          <PlayerConfiguration
            animation={animation}
            delayLogic={delayLogic}
            onAnimationChange={onAnimationChange}
            onDelayLogicChange={onDelayLogicChange}
            className="h-1/3 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
