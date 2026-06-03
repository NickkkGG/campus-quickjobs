export type UserRole = "mahasiswa" | "umkm";

export type UmkmProfile = {
  businessName: string;
  businessType: string;
  description: string;
  address: string;
  campusArea: string;
  serviceRadius: string;
  openHours: string;
  picName: string;
  whatsapp: string;
  teamSize: string;
  hiringNeeds: string[];
  coverImage: string;
};

export const EMPTY_UMKM_PROFILE: UmkmProfile = {
  businessName: "",
  businessType: "",
  description: "",
  address: "",
  campusArea: "UGM & Sekitar",
  serviceRadius: "≤3 km",
  openHours: "08.00 – 22.00",
  picName: "",
  whatsapp: "",
  teamSize: "1–5 orang",
  hiringNeeds: [],
  coverImage:
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
};

export type UmkmScreen =
  | "umkm-onboard-1"
  | "umkm-onboard-2"
  | "umkm-onboard-3"
  | "umkm-onboard-review"
  | "umkm-dashboard"
  | "umkm-post-job"
  | "umkm-applicants"
  | "umkm-boost"
  | "umkm-dompet"
  | "umkm-profil"
  | "umkm-notifikasi"
  | "umkm-chat";

export type UmkmJobPost = {
  id: string;
  title: string;
  category: string;
  rate: string;
  schedule: string;
  slots: number;
  applicants: number;
  status: "aktif" | "draft" | "selesai";
  boosted: boolean;
  imageUrl: string;
};

export type UmkmApplicant = {
  id: string;
  name: string;
  campus: string;
  rating: number;
  jobTitle: string;
  status: "menunggu" | "diterima" | "ditolak";
  avatar: string;
};