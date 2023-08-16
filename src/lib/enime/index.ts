import { env } from "@/env.mjs"; // On server
import {
  AnimeEpisodesResponse,
  AnimeResponse,
  EpisodeResponse,
  PopularResponse,
  RecentResponse,
  SearchResponse,
  SourceResponse,
} from "@/types/enime";

const url = "https://api.enime.moe";
const options = { next: { revalidate: 0 } };

export async function getEpisode(id: string) {
  const endpoint = `${url}/episode/${id}`;
  const res = await fetch(endpoint, options);
  if (!res.ok) throw new Error(res.statusText);
  const data: EpisodeResponse = await res.json();
  return data;
}

export async function getPopular() {
  const endpoint = `${url}/popular`;
  const res = await fetch(endpoint, { cache: "no-cache" });
  if (!res.ok) throw new Error(res.statusText);
  const data: PopularResponse = await res.json();
  return data;
}

export async function getRecent() {
  const endpoint = `${url}/recent?language=JP&perPage=100`;
  const res = await fetch(endpoint, { cache: "no-cache" });
  if (!res.ok) throw new Error(res.statusText);
  const data: RecentResponse = await res.json();
  return data;
}

export async function searchAnime(query: string) {
  const endpoint = `${url}/search/${query}`;
  const res = await fetch(endpoint, { next: { revalidate: 60 * 5 } });
  if (!res.ok) throw new Error(res.statusText);
  const data: SearchResponse = await res.json();
  return data;
}

export async function getAnime(slug: string) {
  const endpoint = `${url}/anime/${slug}`;
  const res = await fetch(endpoint, options);
  if (!res.ok) throw new Error(res.statusText);
  const data: AnimeResponse = await res.json();
  return data;
}

export async function getAnimeEpisodes(slug: string) {
  const endpoint = `${url}/anime/${slug}/episodes`;
  const res = await fetch(endpoint, options);
  if (!res.ok) throw new Error(res.statusText);
  const data: AnimeEpisodesResponse = await res.json();
  return data;
}

export async function getSource(id: string) {
  const endpoint = `${url}/source/${id}`;
  const res = await fetch(endpoint, options);
  if (!res.ok) throw new Error(res.statusText);
  const data: SourceResponse = await res.json();
  return data;
}
