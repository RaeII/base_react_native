import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/shared/api/user/user.api";
import { useAuth } from "@/shared/contexts/AuthContext";
import { useTheme } from "@/shared/hooks/useTheme";

export const useHomeModel = () => {
    const { user, logout } = useAuth();
    const { isDark, toggleTheme } = useTheme();

    const perPage = 5
    
    const {data,fetchNextPage,isFetchingNextPage, hasNextPage, isFetching} = useInfiniteQuery({
        queryKey: ["users"],
        queryFn: ({pageParam = 1}) => getAllUsers(pageParam, perPage),
        initialPageParam: 1,
        getNextPageParam: (lastPage,_allPages,lastPageParam) => {
            if(!lastPage ||  lastPageParam >= lastPage.pagination.totalPages){
                return undefined;
            }
            return lastPageParam + 1;
        },
    })

    const users = data?.pages.flatMap((page) => page.data) || [];
    const firstName = user?.username?.trim()?.split(" ")?.[0] || "Visitante";

    return {
        firstName,
        isDark,
        toggleTheme,
        logout,
        users,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        isFetching
    };
}