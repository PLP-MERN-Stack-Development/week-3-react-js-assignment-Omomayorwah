import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import JokeCard from './components/jokeCard';
import ThemeToggle from './components/ThemeToggle';
import { Search, Trash2, RefreshCw } from "lucide-react";

// Updated API URLs for different joke types
const API_URLS = {
  programming: "https://official-joke-api.appspot.com/jokes/programming/ten",
  general: "https://official-joke-api.appspot.com/jokes/general/ten",
  random: "https://official-joke-api.appspot.com/random_joke"
};


function App() {
const [joke, setJoke] = useState(null); // Changed to single joke instead of array
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchJokes = async (type) => {
    if (!type.trim()) {
      setError("Please enter a joke type (programming, general, or random)");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      // Normalize the search term
      const normalizedType = type.toLowerCase().trim();
      
      // Determine which API endpoint to use
      let apiUrl;
      if (normalizedType === "programming") {
        apiUrl = API_URLS.programming;
      } else if (normalizedType === "general") {
        apiUrl = API_URLS.general;
      } else {
        // For any other search term, get a random joke
        apiUrl = API_URLS.random;
      }

      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // The API returns a single joke object for these endpoints
      setJoke(data);
    } catch (err) {
      setError(`Failed to fetch joke: ${err.message}`);
      setJoke(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    searchJokes("programming");
  }, []);

  const handleDelete = () => {
    setJoke(null);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      searchJokes(searchTerm);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getNewJoke = () => {
    const currentType = joke ? joke.type : 'random';
    searchJokes(currentType);
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
    <BrowserRouter>
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
         <div className="container mx-auto p-6">
           <div className="text-center mb-6">
             <h1 className="text-3xl font-bold mb-4">Joke Rewards</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
               Completed all your tasks? Reward yourself with humor!
              </p>
           </div>
                  
           <div className="flex justify-center items-center gap-4 mb-8">
              <input 
               value={searchTerm}
               placeholder="Search for jokes (programming/general/random)..." 
               className="border rounded-lg p-3 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
               onChange={(e) => setSearchTerm(e.target.value)}
               onKeyPress={handleKeyPress}
              />
            <Button onClick={handleSearch} disabled={loading} className="flex items-center gap-2">
             <Search className="w-4 h-4" />
               Search
            </Button>
         </div>
        
         <div className="mb-6">
            {loading && (
            <div className="text-center py-8">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2" />
              <p>Loading joke...</p>
            </div>
        )}
        
        {error && (
          <div className="text-center text-red-500 py-8">
             <p className="text-lg">{error}</p>
          </div>
        )}
        
        {joke && !loading && !error ? (
          <div className="space-y-6">
            <div className="flex justify-center">
              <JokeCard 
                joke={joke} 
                onDelete={handleDelete}
              />
            </div>
            <div className="flex justify-center">
             <Button 
               variant="outline" 
               onClick={getNewJoke}
               className="flex items-center gap-2"
             >
             <RefreshCw className="w-4 h-4" />
                Get Another {joke.type} Joke
                  </Button>
            </div>
          </div>
        ) : !loading && !error && (
          <div className="text-center py-8">
             <h2 className="text-2xl font-semibold mb-2">No Jokes Found</h2>
             <p className="text-gray-600 dark:text-gray-400">
                Try searching for "programming", "general", or "random"
             </p>
          </div>
        )}
       </div>
      </div>
      </main>
      <Footer 
        companyName="My Task Manager" 
        links={footerLinks} 
        socialLinks={socialLinks} 
      />
    </div>
   </BrowserRouter> 
  );
}

export default App;

