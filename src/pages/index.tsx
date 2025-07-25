import { MotionCardItem } from "@/interfaces";
import motionsLib from "@/lib/motions.lib";
import { useCallback, useState } from "react";
import Cards from "@/components/homepage/cards";
import { Hero } from "@/components/homepage/hero";
import { MainPageBackground } from "@/components/backgrounds/main-page-background";
import { useAnimationControl } from "@/motion/hooks/use-animation-control";
import { useAnimation } from "@/motion/hooks/use-animation";
import PageLayout from "@/layouts/page-layout";

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<MotionCardItem | undefined>(
    undefined
  );
  const { control, onReverse } = useAnimationControl();
  const controller = useAnimation(control);

  const handleHover = useCallback((id?: number) => {
    setSelectedItem(motionsLib.find((item) => item.id === id));
  }, []);

  const isItemHovered = typeof selectedItem !== "undefined";

  return (
    <PageLayout>
      <div className="md:w-1/2 w-full h-full relative border-r overflow-hidden">
        <MainPageBackground selectedItemID={selectedItem?.id} />
        <Hero controller={controller} />
      </div>
      <Cards
        onClick={onReverse}
        items={motionsLib}
        controller={controller}
        isHovered={isItemHovered}
        hoveredItemID={selectedItem?.id}
        onHover={handleHover}
      />
    </PageLayout>
  );
}
