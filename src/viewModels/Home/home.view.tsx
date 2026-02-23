import { ActivityIndicator, SectionList, Text, View } from "react-native";
import { FC } from "react";
import { useHomeModel } from "./home.model";
import { UserItem } from "./components/userItem";
import { HomeHeader } from "./components/homeHeader";

export const HomeView: FC<ReturnType<typeof useHomeModel>> = ({
    firstName,
    isDark,
    toggleTheme,
    logout,
    users,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage
}) => {
    return (
        <View className="flex-1 bg-background">
            <HomeHeader
                firstName={firstName}
                isDark={isDark}
                onToggleTheme={toggleTheme}
                onLogout={logout}
            />

            {/**
              SectionList é uma lista que permite agrupar itens em seções
              Ela é mais perfomática que o "map" em uma view
             */}
            <SectionList
                sections={[
                    {
                        title: "Usuários",
                        data: users,
                    },
                ]}
                renderSectionHeader={({ section: { title } }) => (
                    <Text className="text-foreground text-2xl font-bold mb-4">{title}</Text>
                )}
                renderItem={({ item }) => <UserItem key={item.id} user={item}/>}
                className="flex-1 bg-background p-4 web:w-full web:max-w-6xl web:self-center"
                indicatorStyle={isDark ? "white" : "black"}
                onEndReached={() =>{
                    if(hasNextPage && !isFetchingNextPage){
                        fetchNextPage()
                    }
                }}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    isFetchingNextPage ? <ActivityIndicator size="large" className="text-primary" /> : null
                }
            />
        </View>
    )
}