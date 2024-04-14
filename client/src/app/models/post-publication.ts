export interface PostPublication {
    users_id: number,
    publication_type_id: number,
    category_id: number,
    title: string,
    description: string,
    image: File | null,
    quantity: number,
    unity_price: number
}