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

export default function JokeCard({ joke, idex, onDelete }) {
    return (
        <Card className="p-4 flex justify-between items-center w-96 mx-auto my-6">
            <div className="p-2 w-full">
                 <CardHeader>
                    <CardTitle>{joke.type}</CardTitle>
                    <CardDescription>Enjoy some light-hearted programming humor!</CardDescription>
                </CardHeader>
                <CardContent>
                    <p> {joke.setup} <br /> {joke.punchline} </p>
                </CardContent>
            </div>
                <CardFooter>
                    <Button variant="destructive" onClick={() => onDelete(handleDelete)}>Cancel</Button>
                </CardFooter>
        </Card>
    );
}

