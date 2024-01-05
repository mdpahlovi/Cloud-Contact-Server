export function searchHelper(searchAbleFields: string[], query: string) {
    return {
        $or: searchAbleFields.map(field => ({
            [field]: {
                $regex: query,
                $options: "i",
            },
        })),
    };
}
