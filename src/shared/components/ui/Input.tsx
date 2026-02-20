import { forwardRef } from 'react';
import { Text, TextInput, View } from 'react-native';

import { cn } from '../../lib/utils';
import { useTheme } from '../../hooks/useTheme';

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string;
  labelClasses?: string;
  inputClasses?: string;
}
const Input = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, label, labelClasses, inputClasses, placeholderTextColor, ...props }, ref) => {
    const { isDark } = useTheme();

    return (
      <View className={cn('flex flex-col gap-1.5', className)}>
        {label && (
          <Text className={cn('text-base text-foreground', labelClasses)}>
            {label}
          </Text>
        )}
        <TextInput
          ref={ref}
          placeholderTextColor={placeholderTextColor ?? (isDark ? "hsl(215, 20%, 65%)" : "hsl(215, 16%, 47%)")}
          className={cn(
            'border border-input bg-background text-foreground py-2.5 px-4 rounded-lg',
            'outline-none focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/20 transition-all duration-200',
            inputClasses
          )}
          {...props}
        />
      </View>
    );
  }
);

export { Input };
