import Albums from "@/components/albums/index";
export default async function PhotosPage({ params }: { params: Promise<{ username: string }> }) {
  "use cache"
  const { username } = await params
  return (
    <Albums username={username} />
  )
}
