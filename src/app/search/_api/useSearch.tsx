import api from "@/app/_api/commonApi";

interface SearchPostParams {
    tag?: string | null;
    category?: string | null;
    text?: string | null;
    animal?: string | null;
    page?: number;
    pageSize?: number;
}

export const fetchSearchPost = async ({
    tag,
    category,
    text,
    animal,
    page = 1,
    pageSize = 10,
}: SearchPostParams) => {
    const queryParams = new URLSearchParams();
    if (tag) queryParams.append('tag', tag);
    if (category) queryParams.append('category', category);
    if (text) queryParams.append('text', text);
    if (animal) queryParams.append('animal', animal);
    queryParams.append('page', page.toString());
    queryParams.append('pageSize', pageSize.toString());

    const endpoint = `/posts?${queryParams.toString()}`;
    try {
        const data = await api.get(endpoint);
        console.log(data)
        return data;
    } catch (error: any) {
        console.error(error);
        alert(error.message)
        throw error;
    }
};

export const fetchSearchHistories = async (page: number, pageSize: number) => {
    const endpoint = `/search-histories?page=${page}&pageSize=${pageSize}`
    try {
        const data = await api.get(endpoint)
        console.log(data.message)
        return data
    } catch (error) {
        console.log(error)
    }
}


export const deleteSingleHistory = async (id: number) => {
    const endpoint = `/search-histories/${id}`;
    try {
        await api.delete(endpoint);
        console.log(`Deleted history with id ${id}`);
    } catch (error) {
        console.error(error);
    }
};

export const deleteAllHistories = async () => {
    const endpoint = `/search-histories`;
    try {
        await api.delete(endpoint);
        console.log("All histories deleted");
    } catch (error) {
        console.error(error);
    }
};