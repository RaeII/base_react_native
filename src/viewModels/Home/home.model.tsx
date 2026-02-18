import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/shared/api/user/user.api";

export const useHomeModel = () => {

    const perPage = 5
    
    const {data} = useInfiniteQuery({
        queryKey: ["users"],
        queryFn: ({pageParam = 1}) => getAllUsers(pageParam, perPage),
        initialPageParam: 1,
        getNextPageParam: () => {
            return 1;
        },
    })

    console.log("users",data)

    return {
        data
    };
}