import { FC, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Check, Copy } from "lucide-react";
import MotionContainer from "@/motion/motion-container";
import { CopyCodeButtonProps } from "@/interfaces";

export const CopyCode: FC<CopyCodeButtonProps> = ({ className, onClick }) => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = () => {
    if (copied) return;

    onClick();
    setCopied(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Button variant="ghost" onClick={handleClick}>
      <MotionContainer
        animation={{
          mode: ["fadeIn", "filterBlurIn"],
          transition: "smooth",
          delay: 0.5,
        }}
        controller={{
          configView: { once: false, amount: 0.5 },
          trigger: !copied,
        }}
        elementType="div"
        className={className}
      >
        {copied ? (
          <Check className="text-white size-5" />
        ) : (
          <Copy className="text-white size-5" />
        )}
      </MotionContainer>
    </Button>
  );
};
