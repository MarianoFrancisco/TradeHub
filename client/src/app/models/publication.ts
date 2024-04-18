export interface Publication {
    id: number,
    users_id: number,
    publication_type_id: number,
    publication_state_id: number,
    category_id: number,
    title: string,
    description: string,
    image: string,
    quantity: number,
    unity_price: number,
    date: Date
}  