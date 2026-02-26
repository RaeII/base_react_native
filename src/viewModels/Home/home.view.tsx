import { Text, View } from "react-native";
import { FC } from "react";
import { useHomeModel } from "./home.model";

export const HomeView: FC<ReturnType<typeof useHomeModel>> = ({}) => {
  return (
    <View className="flex-1 bg-background p-4 web:p-6">
      <View className="w-full max-w-5xl self-center gap-4">
        <View className="rounded-3xl border border-border/70 p-5 web:p-6">
          <Text className="text-2xl font-bold text-foreground">Home</Text>
          <Text className="mt-2 text-sm text-muted-foreground">
            Acompanhe seu progresso e acesse rapidamente suas principais funcionalidades.
          </Text>
        </View>

        <View className="rounded-3xl border border-border/70 p-5 web:p-6">
          <Text className="text-base font-semibold text-foreground">Visão geral</Text>
          <Text className="mt-2 text-sm text-muted-foreground">
            Este espaço foi estruturado para manter o mesmo padrão visual premium das telas
            autenticadas em Android, iOS e Web.
          </Text>
        </View>
      </View>
    </View>
  );
};