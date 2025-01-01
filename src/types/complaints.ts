export type Complaint = {
    complaint_id: string;
    booking_id: string;
    user_id: string;
    status: string;
    message: string;
}

export type PaginatedComplaints = {
    complaints: Complaint[];
    total: number;
}