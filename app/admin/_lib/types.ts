export interface User {
  id: number;
  username: string;
  name: string;
  role: string;
}

export interface Client {
  id: number;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  dob?: string;
  nominee?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Policy {
  id: number;
  client_id: number;
  provider: string;
  policy_number: string;
  policy_type?: "Life" | "Health" | "Motor" | "Home" | "Travel" | "Business" | "Other";
  premium_amount?: number;
  sum_assured?: number;
  start_date?: string;
  end_date?: string;
  frequency?: "Monthly" | "Quarterly" | "Half-Yearly" | "Yearly" | "One-Time";
  status?: "active" | "lapsed" | "cancelled" | "matured";
  created_at?: string;
  updated_at?: string;
  // Joined fields
  client_name?: string;
  client_phone?: string;
}

export interface Claim {
  id: number;
  policy_id: number;
  claim_type?: string;
  claim_date?: string;
  description?: string;
  amount?: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
  // Joined fields
  policy_number?: string;
  documents?: Document[];
}

export interface Renewal {
  id: number;
  policy_number: string;
  provider: string;
  policy_type?: string;
  premium_amount?: number;
  end_date: string;
  status?: string;
  client_name: string;
  client_phone: string;
}

export interface Payment {
  id: number;
  policy_id: number;
  amount: number;
  payment_date?: string;
  method?: string;
  note?: string;
  policy_number?: string;
  created_at?: string;
}

export interface Document {
  id: number;
  client_id?: number;
  claim_id?: number;
  filename: string;
  url?: string;
  created_at?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  status: number;
}
