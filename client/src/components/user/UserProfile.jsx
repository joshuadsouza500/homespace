/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  User,
  Mail,
  MapPin,
  Trash2,
  Edit,
  Save,
  Phone,
  Users,
} from "lucide-react";
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
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, updateUserProfile } from "@/store/user/action";
import { getUserProfile } from "@/store/auth/action";

import UploadWidget from "../ui/UploadWidget";

export default function UserProfile({ auth, user }) {
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getUserProfile(jwt));
    }
  }, [dispatch, jwt]);

  const [editedUser, setEditedUser] = useState(user);
  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleInputChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    // Here you would typically send the updated user data to your backend
    const { name, mobile, email, role, company, avatar } = editedUser;
    const updatedUser = { name, mobile, email, role, company, avatar };

    dispatch(updateUserProfile(updatedUser));
    dispatch(getUserProfile(jwt));
    setIsEditing(false);
  };
  const handleImageUpload = (imageUrl) => {
    setEditedUser({ ...editedUser, avatar: imageUrl });
  };

  const handleDelete = () => {
    // Here you would typically send a request to delete the user account
    const message = dispatch(deleteUser());
    console.log("Deleting user account");

    if (message) {
      window.location.href = "/";
      // location.reload();
    }
  };
  //console.log("jj", jwt);
  return (
    <div className="container mx-auto px-4 lg:px-16 pt-4 pb-8 font-jakarta">
      <h1 className="text-3xl font-bold mb-8 text-text text-center">
        User Profile
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-2 rounded-md py-2 items-center  ">
        <div className="md:col-span-1   flex flex-col pb-1 max-sm:border-b items-center justify-center">
          <div className="flex flex-col  items-center ">
            <Avatar className="ring-1 ring-text rounded-full size-48 mb-2 md:mb-4">
              <AvatarImage src={editedUser?.avatar} alt={editedUser?.name} />
              <AvatarFallback>
                {editedUser?.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {isEditing ? (
              <UploadWidget
                uwConfig={{
                  cloudName: "diafh6bdm",
                  uploadPreset: "homespace",
                  multiple: false,
                  maxImageFileSize: 2000000,
                  folder: "userProfile",
                }}
                handleImageUpload={handleImageUpload}
              />
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-Bgpurple w-36 md:w-48 mb-2 hover:bg-indigo-800 mt-4"
              >
                <Edit className="size-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>
        <div className="md:col-span-2 space-y-1 border-l-2 pl-3 ">
          <div>
            <Label htmlFor="name" className="font-semibold">
              Name
            </Label>
            <div className="flex items-center pb-1">
              <User className="size-4 mr-2 text-text" />
              {isEditing ? (
                <Input
                  id="name"
                  name="name"
                  value={editedUser?.name}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{user?.name}</span>
              )}
            </div>
            <div>
              <Label htmlFor="mobile" className="font-semibold">
                Mobile
              </Label>
              <div className="flex items-center">
                <Phone className="size-4 mr-2 text-text" />
                {isEditing ? (
                  <Input
                    id="mobile"
                    name="mobile"
                    value={editedUser?.mobile}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span>{user?.mobile}</span>
                )}
              </div>
            </div>
          </div>
          <div className="pb-1">
            <Label htmlFor="email" className="font-semibold">
              Email
            </Label>
            <div className="flex items-center">
              <Mail className="size-4 mr-2 text-text" />
              {isEditing ? (
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={editedUser?.email}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{user?.email}</span>
              )}
            </div>
          </div>
          <span>
            <div>
              <Label htmlFor="role" className="font-semibold">
                Role
              </Label>
              <div className="flex items-center">
                <Users className="size-4 mr-2 text-text" />
                {isEditing ? (
                  <select
                    id="role"
                    name="role"
                    value={editedUser?.role}
                    onChange={handleInputChange}
                    className="border rounded "
                  >
                    <option className="text-sm" value="AGENT">
                      AGENT
                    </option>
                    <option className="text-sm" value="USER">
                      USER
                    </option>
                  </select>
                ) : (
                  <span>{user?.role}</span>
                )}
              </div>
            </div>

            <div className="space-y-2 mt-3">
              <div className="flex items-start">
                {isEditing && editedUser?.role === "AGENT" ? (
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="company" className="font-semibold">
                      Company
                    </Label>
                    <span className="flex">
                      <MapPin className="size-4 mr-2 mt-1 text-text" />
                      <Textarea
                        id="company"
                        name="company"
                        value={editedUser?.company || " "}
                        onChange={handleInputChange}
                        rows={3}
                      />
                    </span>
                  </div>
                ) : (
                  user?.role === "AGENT" && (
                    <div className="flex flex-col ">
                      <Label htmlFor="company" className="font-semibold">
                        Company
                      </Label>
                      <span className="flex items-center  pb-2">
                        <MapPin className="size-4 mr-2 mt-1 text-text" />

                        <h4 className="font-semibold text-text text-lg">
                          {user?.company}
                        </h4>
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </span>

          {isEditing && (
            <div className="flex space-x-2 pt-3 pb-1 ">
              <Button
                onClick={handleUpdate}
                className="bg-text hover:bg-indigo-800 md:w-36"
              >
                <Save className="size-4 mr-2" />
                Save Profile
              </Button>
              <Button
                variant="outline"
                className="md:w-36 border-text"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          )}
          {!isEditing && (
            <div className=" max-md:pt-6  pb-2 max-md:flex justify-center items-center">
              {" "}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="size-4 mr-2" />
                    Delete User
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
