import { forwardRef, useState } from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { cn } from '../../lib/utils';
import { useTheme } from '../../hooks/useTheme';

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string;
  labelClasses?: string;
  inputClasses?: string;
}
const Input = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, label, labelClasses, inputClasses, placeholderTextColor, secureTextEntry, ...props }, ref) => {
    const { isDark } = useTheme();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const isPasswordInput = secureTextEntry !== undefined;
    const isSecure = isPasswordInput ? !isPasswordVisible : false;

    return (
      <View className={cn('flex flex-col gap-1.5', className)}>
        {label && (
          <Text className={cn('text-base text-foreground', labelClasses)}>
            {label}
          </Text>
        )}
        <View className="relative">
          <TextInput
            ref={ref}
            secureTextEntry={isSecure}
            placeholderTextColor={placeholderTextColor ?? (isDark ? "hsl(215, 20%, 65%)" : "hsl(215, 16%, 47%)")}
            className={cn(
              'border border-input bg-background text-foreground py-3.5 px-4 rounded-lg',
              'outline-none focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/20 transition-all duration-200',
              isPasswordInput ? 'pr-12' : '',
              inputClasses
            )}
            {...props}
          />
          {isPasswordInput && (
            <TouchableOpacity
              className="absolute right-0 top-0 bottom-0 px-4 justify-center items-center h-full"
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              activeOpacity={0.7}
            >
              <Ionicons 
                name={isPasswordVisible ? 'eye-off' : 'eye'} 
                size={22} 
                color={isDark ? "hsl(215, 20%, 65%)" : "hsl(215, 16%, 47%)"} 
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
);

export { Input };
