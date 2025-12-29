import { Dock } from "./dock-two";

import {
  Home,
  Search,
  Music,
  Heart,
  Settings,
  Plus,
  User
} from "lucide-react"

function SocialDock() {
  const items = [
    { icon: Home, label: "Home" },
    { icon: Search, label: "Search" },
    { icon: Heart, label: "Favorites" },
    { icon: Plus, label: "Add New" },
  ]

  return <Dock items={items} />
}

function NewDock() {
    const items =[
    { icon: Plus, label: "Add New" },
    ]
    return <Dock items={items} />
}

export  {SocialDock, NewDock};