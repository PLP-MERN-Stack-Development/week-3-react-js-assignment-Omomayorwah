import { useState, useEffect } from 'react'
import './index.css'
import Footer from "./components/Footer"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
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
import TaskManager from './components/TaskManager';
import { ThemeProvider } from './components/theme-provider';
import SearchIcon from './components/search.svg';
import JokeCard from './components/jokeCard';

const API_URL = "https://official-joke-api.appspot.com/jokes/random/25";

const joke1 = {
  "type":"programming",
  "setup":"Why did the programmer go to art school?",
  "punchline":"He wanted to learn how to code outside the box.",
  "id":414
}


function App() {
const [jokes, setJokes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  const searchJokes = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    
    setJokes(data.search);
  }

  useEffect(() => {
    searchJokes("programming");
  }, []);

  const handleDelete = (index) => {
    setJokes((prevJokes) => prevJokes.filter((_, i) =>
      i !== index
    ));
  };


  const footerLinks = [
    {
      title: 'Quick Links',
      links: [
        { label: 'About', url: '/about' },
        { label: 'Services', url: '/services' },
        { label: 'Contact', url: '/contact' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', url: '/privacy' },
        { label: 'Terms of Service', url: '/terms' },
        { label: 'Cookie Policy', url: '/cookies' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Twitter', url: 'https://twitter.com' },
    { name: 'Facebook', url: 'https://facebook.com' },
    { name: 'Instagram', url: 'https://instagram.com' }
  ];

  return (
    <ThemeProvider  defaultTheme="light" storageKey="vite-ui-theme">
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <NavigationMenu className="p-6">
          <NavigationMenuList>
            <NavigationMenuItem>
            <Button>Home</Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Web development</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Solusions</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Web optimization</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="container mx-auto p-6">
          <TaskManager />
        </div>
        <div className="flex justify-center items-center p-6">
          <p className='mr-2'>Completed all your tasks? Reward yourself with humor: </p>
          <input 
            value={searchTerm}
            placeholder="Search for jokes title ( programming/general ) ..." 
            className="border rounded p-2 w-1/2"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className="ml-2">
            <img src={SearchIcon} alt="Search" className="w-5 h-5" onClick={()=> searchJokes(searchTerm)} />
          </Button>
        </div>

        {
          jokes?.length > 0
            ? (
              jokes.map((joke, idx) => (
                <JokeCard key={joke.id || idx} joke={joke} />
              ))
            ) : (
              <div>
                <h2>No Jokes Found</h2>
              </div>
            )
        }


       
      </main>
      <Footer 
        companyName="My Task Manager" 
        links={footerLinks} 
        socialLinks={socialLinks} 
      />
    </div>
    </ThemeProvider>
  );
}

export default App;

