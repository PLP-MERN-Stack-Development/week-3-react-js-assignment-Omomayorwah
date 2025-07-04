import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function JokeCard({ joke, onDelete }) {
    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
            <CardTitle className="text-center capitalize">{joke.type} Joke</CardTitle>
            <CardDescription className="text-center">#{joke.id}</CardDescription>
            </CardHeader>
            <CardContent>
            <div className="space-y-4">
                <p className="text-lg font-medium">{joke.setup}</p>
                <p className="text-base text-blue-600 dark:text-blue-400 italic">{joke.punchline}</p>
            </div>
            </CardContent>
            <CardFooter className="flex justify-center">
            <Button 
                variant="outline" 
                size="sm" 
                onClick={onDelete}
                className="flex items-center gap-2"
            >
                <Trash2 className="w-4 h-4" />
                Remove
            </Button>
            </CardFooter>
        </Card>
    );
}