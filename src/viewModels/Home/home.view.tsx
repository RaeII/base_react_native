import { ActivityIndicator, SectionList, Text, View } from "react-native";
import { FC } from "react";
import { useHomeModel } from "./home.model";
import { UserItem } from "./components/userItem";

export const HomeView: FC<ReturnType<typeof useHomeModel>> = ({
    users,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isFetching
}) => {
    return (
        /**
          SectionList é uma lista que permite agrupar itens em seções
          Ela é mais perfomática que o "map" em uma view
         */
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
            className="flex-1 bg-background p-4"
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
    )
}