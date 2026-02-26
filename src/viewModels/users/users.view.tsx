import { ActivityIndicator, SectionList, Text, View } from "react-native";
import { FC } from "react";
import { useUsersModel } from "./users.model";
import { UserItem } from "./components/userItem";

export const UsersView: FC<ReturnType<typeof useUsersModel>> = ({
  isDark,
  users,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
  isFetching,
}) => {
  return (
    <View className="flex-1 bg-background p-4 web:p-6">
      <View className="w-full max-w-5xl self-center flex-1 gap-4">
        <View className="rounded-3xl border border-border/70 p-5 web:p-6">
          <Text className="text-2xl font-bold text-foreground">Usuarios</Text>
          <Text className="mt-2 text-sm text-muted-foreground">
            Gerencie e visualize os usuarios cadastrados na plataforma.
          </Text>
        </View>

        <View className="flex-1 rounded-3xl border border-border/70 p-5 web:p-6">
          <Text className="text-base font-semibold text-foreground">Lista de usuarios</Text>
          <Text className="mt-1 text-xs text-muted-foreground">
            Scroll infinito com carregamento progressivo.
          </Text>

          <SectionList
            sections={[
              {
                title: "Usuarios",
                data: users,
              },
            ]}
            renderSectionHeader={() => null}
            renderItem={({ item }) => <UserItem user={item} />}
            keyExtractor={(item) => item.id.toString()}
            className="mt-4 flex-1"
            indicatorStyle={isDark ? "white" : "black"}
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={
              isFetching ? (
                <View className="py-6">
                  <ActivityIndicator size="large" className="text-primary" />
                </View>
              ) : (
                <View className="rounded-2xl border border-border/60 px-4 py-3">
                  <Text className="text-sm font-medium text-foreground">
                    Nenhum usuario encontrado.
                  </Text>
                </View>
              )
            }
            ListFooterComponent={
              isFetchingNextPage ? (
                <View className="py-4">
                  <ActivityIndicator size="small" className="text-primary" />
                </View>
              ) : null
            }
            contentContainerStyle={{ paddingBottom: 12 }}
            stickySectionHeadersEnabled={false}
          />
        </View>
      </View>
    </View>
  );
};