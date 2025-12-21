import { z } from "zod";

export const interestsSchema = z.object({
  hobbies: z.string().optional(),
  favourite_tv_shows: z.string().optional(),
  favourite_movies: z.string().optional(),
  favourite_games: z.string().optional(),
  favourite_music_artists: z.string().optional(),
  favourite_books: z.string().optional(),
  favourite_writers: z.string().optional(),
  other_interests: z.string().optional(),
});

export type InterestsFormValues = z.infer<typeof interestsSchema>;