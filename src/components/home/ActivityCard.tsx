import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function ActivityCard() {
  return (
    <Card className="gap-2 pb-2">
      <CardHeader>
        <CardTitle>Activity Feed</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {activities.map((activity) => (
          <div
            key={activity.name}
            className="flex items-center justify-between w-full text-sm border-t p-4"
          >
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={activity.avatar} alt={activity.name} />
                <AvatarFallback>
                  {activity.name.split(" ")[0].charAt(0)}
                </AvatarFallback>
              </Avatar>

              <p className="text-sm text-muted-foreground">
                <strong className="text-secondary-foreground">{activity.name}</strong>{" "}
                {activity.actionText}{" "}
                <strong className="text-primary">{activity.highlight}</strong>
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

var activities = [
  {
    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&w=100&q=60",
    name: "Marina Polson",
    actionText: "commented on Jason Mark’s",
    highlight: "photo",
    time: "2 mins ago",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&w=100&q=60",
    name: "Jake Parker",
    actionText: "liked Nicholas Grissom’s",
    highlight: "status update",
    time: "5 mins ago",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&w=100&q=60",
    name: "Mary Jane Stark",
    actionText: "added 20 new photos to her",
    highlight: "gallery album",
    time: "12 mins ago",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&w=100&q=60",
    name: "Nicholas Grissom",
    actionText: "updated his",
    highlight: "profile photo",
    time: "1 hour ago",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&w=100&q=60",
    name: "Lara Collins",
    actionText: "shared a new",
    highlight: "post",
    time: "1 hour ago",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&w=100&q=60",
    name: "Hannah Stone",
    actionText: "commented on Alex Moore’s",
    highlight: "status",
    time: "2 hours ago",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&w=100&q=60",
    name: "David Summers",
    actionText: "liked your",
    highlight: "photo",
    time: "3 hours ago",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&w=100&q=60",
    name: "Eliza Trent",
    actionText: "started following",
    highlight: "you",
    time: "4 hours ago",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&w=100&q=60",
    name: "Chris Bolton",
    actionText: "updated his",
    highlight: "cover photo",
    time: "5 hours ago",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&w=100&q=60",
    name: "Ryan Carver",
    actionText: "commented on your",
    highlight: "post",
    time: "7 hours ago",
  },
];
