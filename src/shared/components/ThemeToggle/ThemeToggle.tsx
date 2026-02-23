import { FC, useEffect, useMemo, useRef } from "react";
import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { cn } from "@/shared/lib/utils";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  size?: "sm" | "md";
  className?: string;
}

export const ThemeToggle: FC<ThemeToggleProps> = ({
  isDark,
  onToggle,
  size = "sm",
  className,
}) => {
  const metrics = useMemo(() => {
    const segment = size === "md" ? 36 : 32;
    const padding = size === "md" ? 3 : 2;
    const gap = size === "md" ? 4 : 3;
    return { segment, padding, gap };
  }, [size]);

  const containerWidth = useMemo(
    () => metrics.segment * 2 + metrics.padding * 2 + metrics.gap,
    [metrics.gap, metrics.padding, metrics.segment]
  );

  const translateX = useSharedValue(isDark ? metrics.segment + metrics.gap : 0);

  useEffect(() => {
    translateX.value = withTiming(isDark ? metrics.segment + metrics.gap : 0, {
      duration: 220,
      easing: Easing.out(Easing.cubic),
    });
  }, [isDark, metrics.gap, metrics.segment, translateX]);

  const indicatorAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const activeIconColor = isDark
    ? "hsl(210, 40%, 98%)"
    : "hsl(222, 47%, 11%)";
  const inactiveIconColor = "hsl(215, 16%, 47%)";

  return (
    <Pressable
      onPress={onToggle}
      className={cn(
        "relative flex-row items-center overflow-hidden rounded-full border border-border bg-muted/80",
        className
      )}
      style={{
        padding: metrics.padding,
        width: containerWidth,
        height: metrics.segment + metrics.padding * 2,
      }}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            top: metrics.padding,
            left: metrics.padding,
            width: metrics.segment,
            height: metrics.segment,
          },
          indicatorAnimatedStyle,
        ]}
        pointerEvents="none"
      >
        <View className="flex-1 rounded-full bg-card shadow-sm shadow-black/15" />
      </Animated.View>

      <View
        className="items-center justify-center"
        style={{ width: metrics.segment, height: metrics.segment }}
        pointerEvents="none"
      >
        <Ionicons
          name="sunny-outline"
          size={size === "md" ? 18 : 16}
          color={!isDark ? activeIconColor : inactiveIconColor}
        />
      </View>

      <View
        className="items-center justify-center"
        style={{ width: metrics.segment, height: metrics.segment, marginLeft: metrics.gap }}
        pointerEvents="none"
      >
        <Ionicons
          name="moon-outline"
          size={size === "md" ? 18 : 16}
          color={isDark ? activeIconColor : inactiveIconColor}
        />
      </View>
    </Pressable>
  );
};
