export type Room ={
    room_id: string,
    title: string,
    amenities: string[],
    description: string,
    image: string,
    status: string,
    price_per_night: number,
    created_at: Date,
}
export type PagintedRoom = {
    rooms: Room[],
    total: number
}

export type CreateRoom = {
    title: string,
    amenities: string[],
    description: string,
    image: string,
    status: string,
    price_per_night: number,
}