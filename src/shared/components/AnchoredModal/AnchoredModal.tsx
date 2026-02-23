import { FC, ReactNode, useEffect, useState } from "react";
import { Modal, Pressable, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { cn } from "@/shared/lib/utils";

type AnchoredModalPlacement = "bottom-end" | "bottom-start";

interface AnchoredModalProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: { current: any };
  children: ReactNode;
  placement?: AnchoredModalPlacement;
  offset?: number;
  containerClassName?: string;
}

export const AnchoredModal: FC<AnchoredModalProps> = ({
  isOpen,
  onClose,
  anchorRef,
  children,
  placement = "bottom-end",
  offset = 8,
  containerClassName,
}) => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [position, setPosition] = useState<{ top: number; left?: number; right?: number } | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Evita "pulo" durante o fade-out no web mantendo a última posição.
    // Também garante uma posição inicial enquanto o measureInWindow resolve.
    setPosition((previous) => previous ?? { top: insets.top + 64, right: 16 });

    const node = anchorRef?.current;
    if (node?.measureInWindow) {
      node.measureInWindow((x: number, y: number, w: number, h: number) => {
        const top = Math.max(insets.top + 12, y + h + offset);

        if (placement === "bottom-start") {
          const left = Math.max(16, x);
          setPosition({ top, left });
          return;
        }

        const right = Math.max(16, width - (x + w));
        setPosition({ top, right });
      });
      return;
    }

    // fallback (principalmente para web)
    setPosition({ top: insets.top + 64, right: 16 });
  }, [anchorRef, insets.top, isOpen, offset, placement, width]);

  return (
    <Modal visible={isOpen} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable className="flex-1" onPress={onClose}>
        <Pressable
          className={cn(
            "absolute z-30 rounded-2xl border border-border bg-card shadow-lg shadow-black/15",
            containerClassName
          )}
          style={{
            top: position?.top ?? insets.top + 64,
            left: position?.left,
            right: position?.right ?? 16,
          }}
          onPress={() => {}}
        >
          <View className="p-3">{children}</View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

