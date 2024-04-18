export interface PostTransaction {
    buyer_users_id: number,
    seller_users_id: number,
    publication_id: number,
    publication_type_id: number,
    quantity: number,
    unity_price: number,
    description: string,
    total: number,
    coin: number
}