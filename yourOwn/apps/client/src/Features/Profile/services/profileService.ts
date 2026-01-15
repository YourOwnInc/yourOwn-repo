// src/features/profile/services/profileApiService.ts
import { ProfileDTO, UpdateProfileInput, UpsertLinkInput } from "../types/profile.types";

const BASE = "http://localhost:5000/api";

function getAuthHeader() {
  const token = localStorage.getItem("token");
  return `Bearer ${token}`;
}

/**
 * Fetches all profiles associated with the authenticated user.
 */
export async function getUserProfiles(): Promise<ProfileDTO[]> {
  const res = await fetch(`${BASE}/profiles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthHeader(),
    },
  });
  if (!res.ok) throw new Error("Failed to fetch user profiles");
  return res.json();
}

/**
 * Fetches a specific profile by its ID.
 */
export async function getProfileById(id: string): Promise<ProfileDTO> {
  const res = await fetch(`${BASE}/profiles/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthHeader(),
    },
  });
  if (!res.ok) throw new Error(`Failed to fetch profile: ${id}`);
  return res.json();
}

/**
 * Updates high-level profile metadata (name, bio, etc.)
 */
export async function updateProfile(profileId: string, data: UpdateProfileInput): Promise<ProfileDTO> {
  const res = await fetch(`${BASE}/profiles/${profileId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthHeader(),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update profile");
  return res.json();
}

/**
 * Adds a new link or updates an existing one within a profile.
 */
export async function upsertLink(profileId: string, linkData: UpsertLinkInput): Promise<ProfileDTO> {
  const res = await fetch(`${BASE}/profiles/${profileId}/links`, {
    method: "PUT", // PUT is often used for upsert operations
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthHeader(),
    },
    body: JSON.stringify(linkData),
  });
  if (!res.ok) throw new Error("Failed to upsert link");
  return res.json();
}

/**
 * Deletes a specific link from a profile.
 */
export async function deleteLink(profileId: string, linkId: string): Promise<void> {
  const res = await fetch(`${BASE}/profiles/${profileId}/links/${linkId}`, {
    method: "DELETE",
    headers: {
      Authorization: getAuthHeader(),
    },
  });
  if (!res.ok) throw new Error("Failed to delete link");
}