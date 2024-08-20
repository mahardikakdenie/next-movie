"use client";

import { getMovieSearch } from "@/lib/api/movieApi";
import { AxiosError, AxiosResponse } from "axios";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
    const { search }: {search: string} = useParams();
    useEffect(() => {
        const getSearch = () => {
            const params = {
                q: search,
            };
            const callback = (res: AxiosResponse) => {
                const data = res?.data;
                console.log("🚀 ~ callback ~ data:", data);
            };
            const err = (e: AxiosError) => {
                console.log(e);
            };
            getMovieSearch(params, callback, err);
        };

        getSearch();
    }, [search]);
    return (
        <div>
            <h1 className="text-red-400">halo</h1>
        </div>
    )
};

export default Page;
