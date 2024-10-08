import { useState } from "react";
import { User, Mail, MapPin, Trash2, Edit, Save } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
const user = {
  username: "johndoe",
  email: "john@example.com",
  image: "https://cdn-icons-png.flaticon.com/128/10643/10643283.png",

  address: "123 Real Estate St, Property City, State 12345",
};
export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleInputChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    // Here you would typically send the updated user data to your backend
    console.log("Updating user:", editedUser);
    setIsEditing(false);
  };

  const handleDelete = () => {
    // Here you would typically send a request to delete the user account
    console.log("Deleting user account");
  };

  return (
    <div className="container mx-auto px-4 pt-4 pb-8">
      <h1 className="text-3xl font-bold mb-8 text-text text-center">
        User Profile
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-2 rounded-md py-2 items-center  ">
        <div className="md:col-span-1  ">
          <div className="flex flex-col  items-center space-y-6  ">
            <Avatar className="w-48 h-48 ">
              <AvatarImage src={user.image} alt={user.username} />
              <AvatarFallback>
                {user.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} className="w-full">
                <Edit className="size-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>
        <div className="md:col-span-2 space-y-4 border-l-2 pl-3 ">
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2 text-muted-foreground" />
              {isEditing ? (
                <Input
                  id="username"
                  name="username"
                  value={editedUser.username}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{user.username}</span>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
              {isEditing ? (
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{user.email}</span>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <div className="flex items-start">
              <MapPin className="w-4 h-4 mr-2 mt-1 text-muted-foreground" />
              {isEditing ? (
                <Textarea
                  id="address"
                  name="address"
                  value={editedUser.address}
                  onChange={handleInputChange}
                  rows={3}
                />
              ) : (
                <span>{user.address}</span>
              )}
            </div>
          </div>
          {isEditing && (
            <div className="flex space-x-2">
              <Button onClick={handleUpdate}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          )}
          {!isEditing && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to delete your account?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600"
                    onClick={handleDelete}
                  >
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
    </div>
  );
}
