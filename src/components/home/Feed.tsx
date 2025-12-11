"use client";

import { useEffect, useRef, useState } from "react";
import { friendsSuggestion } from "@/lib/friends-suggestion";
import { pagesSuggestion } from "@/lib/page-suggestion";
import { posts } from "@/lib/posts";
import PostCard from "../global/PostCard";
import { SuggestionsSlider } from "./SuggestionsSlider";
import { Post } from "@/types/Post";
import { Suggestion } from "@/types/Suggestion";
import { Loader2 } from "lucide-react";

type FeedItem =
  | { type: "post"; data: Post }
  | { type: "suggested_friends"; data: Suggestion[] }
  | { type: "suggested_pages"; data: Suggestion[] };

const BATCH_SIZE = 10; // how many posts to load at once

export default function Feed() {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  function generateFeed(limit: number) {
    const feedArr: FeedItem[] = [];

    posts.slice(0, limit).forEach((post, index) => {
      feedArr.push({ type: "post", data: post });

      if ((index + 1) % 8 === 0) {
        feedArr.push({ type: "suggested_friends", data: friendsSuggestion });
      }

      if ((index + 1) % 13 === 0) {
        feedArr.push({ type: "suggested_pages", data: pagesSuggestion });
      }
    });

    return feedArr;
  }

  // Load initial feed
  useEffect(() => {
    setFeed(generateFeed(visibleCount));
  }, [visibleCount]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, posts.length));
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, []);

  return (
    <>
      {feed.map((feedItem, index) => {
        switch (feedItem.type) {
          case "post":
            return <PostCard key={feedItem.data._id} post={feedItem.data} />;
          case "suggested_friends":
            return (
              <SuggestionsSlider
                key={"friends-" + index}
                type="friends"
                accounts={feedItem.data}
              />
            );
          case "suggested_pages":
            return (
              <SuggestionsSlider
                key={"pages-" + index}
                type="pages"
                accounts={feedItem.data}
              />
            );
        }
      })}

      {/* infinite scroll loader */}
      <div ref={loaderRef} style={{ height: "40px", marginBottom: "60px" }}>
        {visibleCount < posts.length ? <Loader2 className="animate-spin text-primary" /> : "You have reached the end"}
      </div>
    </>
  );
}
