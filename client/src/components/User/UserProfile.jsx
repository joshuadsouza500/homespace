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
  Calendar,
  Home,
  Clock,
  LockKeyhole,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/UI/ShadCN/avatar";
import { Button } from "@/components/UI/ShadCN/button";
import { Input } from "@/components/UI/ShadCN/input";
import { Label } from "@/components/UI/ShadCN/label";
import { Textarea } from "@/components/UI/ShadCN/textarea";
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
} from "@/components/UI/ShadCN/alert-dialog";
import { useDispatch } from "react-redux";
import { deleteUser, updateUserProfile } from "@/store/user/action";
import { getUserProfile } from "@/store/auth/action";

import UploadWidget from "../CustomComp/UploadWidget";
import { Card, CardContent, CardHeader, CardTitle } from "../UI/ShadCN/card";
import { Badge } from "../UI/ShadCN/badge";
// Placeholder appointments data
const appointments = [
  {
    id: "1",
    date: "June 15, 2023",
    time: "10:00 AM",
    property: "Luxury Condo",
    address: "789 Park Avenue",
    client: "Sarah Johnson",
    status: "upcoming",
  },
  {
    id: "2",
    date: "June 17, 2023",
    time: "2:30 PM",
    property: "Beachfront Villa",
    address: "123 Ocean Drive",
    client: "Michael Chen",
    status: "upcoming",
  },
  {
    id: "3",
    date: "June 10, 2023",
    time: "1:00 PM",
    property: "Modern Apartment",
    address: "456 Downtown Blvd",
    client: "Emily Wilson",
    status: "completed",
  },
  {
    id: "4",
    date: "June 5, 2023",
    time: "11:30 AM",
    property: "Garden Townhouse",
    address: "222 Willow Street",
    client: "David Thompson",
    status: "completed",
  },
];
export default function UserProfile({ user }) {
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

    if (message) {
      window.location.href = "/";
      // location.reload();
    }
  };
  const comingSoon = true;
  //console.log("jj", user);
  return (
    <section className="container mx-auto px-4 lg:px-8 pt-4 lg:pt-8 pb-8 font-jakarta bg-white estate-50">
      <h1 className="text-3xl md:text-4xl   font-bold text-text dark:text-white mb-6 xl:mb-10 text-center">
        My Profile
      </h1>
      <section className="grid grid-rows-1  gap-6 xl:gap-8 2xl:mx-20 cursor-pointer">
        {/* User Profile section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6  rounded-md  max-md:items-center    w-full  h-fit max-w-6xl mx-auto">
          <div className="  flex flex-col  items-center justify-center  md:pt-4  bg-white/80 dark:bg-black/40  border border-black/10 dark:border-white/10 shadow rounded-lg pt-4 lg:pt-6 pb-6 ">
            <Avatar className="ring-1 ring-text dark:ring-muted rounded-full size-48 mb-2 md:mb-4">
              <AvatarImage src={editedUser?.avatar} alt={editedUser?.name} />
              <AvatarFallback>
                {editedUser?.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold text-estate-800 dark:text-white mb-1">
              {user?.name}
            </h2>
            <p className="text-estate-500 dark:text-muted mb-4">{user?.role}</p>
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
            ) : null}
          </div>
          {/*Personal Info */}
          <div className="md:col-span-2 space-y-2 xl:space-y-4  px-3 lg:px-6    bg-white/80 dark:bg-black/40  border border-black/10 dark:border-white/10 shadow  rounded-lg pt-4 lg:pt-6 pb-6 ">
            <div className="flex items-center justify-between mb-2 pb-2  ">
              <h3 className="text-lg font-medium xl:text-xl text-estate-800 dark:text-white">
                Personal Information
              </h3>
              {/* Edit and delete user */}
              <div className="flex flex-row-reverse  items-center gap-x-6">
                {" "}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="text-red-600 hover:text-red-800 flex items-center gap-1 md:gap-2 max-sm:text-sm">
                      <Trash2 className="size-4 " />
                      Delete
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete your account?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
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
                </AlertDialog>{" "}
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-Bgpurple  hover:text-indigo-800  flex items-center gap-1 md:gap-2 max-sm:text-sm"
                >
                  <Edit className="size-4 " />
                  Edit
                </button>
              </div>
            </div>
            <section className="md:grid md:grid-cols-2 pt-2 space-y-2 xl:space-y-4">
              {" "}
              <div className="space-y-2 xl:space-y-4">
                {" "}
                {/* User */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-Primary/20 dark:bg-Primary/20 flex items-center justify-center">
                    <User className="h-5 w-5 text-Bgpurple " />
                  </div>
                  <div>
                    <Label
                      htmlFor="name"
                      className="font-normal text-sm text-estate-500 dark:text-muted-foreground"
                    >
                      Full Name
                    </Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        name="name"
                        value={editedUser?.name}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="font-medium text-estate-800 dark:text-white">
                        {user?.name}
                      </p>
                    )}
                  </div>
                </div>
                {/* Mobile */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full   bg-Primary/20 dark:bg-Primary/20 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-Bgpurple " />
                  </div>
                  <div>
                    <Label
                      htmlFor="mobile"
                      className="font-normal text-sm text-estate-500 dark:text-muted-foreground"
                    >
                      Mobile
                    </Label>
                    {isEditing ? (
                      <Input
                        id="mobile"
                        name="mobile"
                        value={editedUser?.mobile}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="font-medium text-estate-800 dark:text-white">
                        + {user?.mobile}
                      </p>
                    )}
                  </div>
                </div>
                {/* Email */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-Primary/20 dark:bg-Primary/20 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-Bgpurple " />
                  </div>
                  <div>
                    <Label
                      htmlFor="email"
                      className="font-normal text-sm text-estate-500 dark:text-muted-foreground"
                    >
                      Email
                    </Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={editedUser?.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="font-medium text-estate-800 dark:text-white">
                        {user?.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* Role $ company */}
              <div className="space-y-2 xl:space-y-4">
                {" "}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-Primary/20 dark:bg-Primary/20 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-Bgpurple " />
                  </div>
                  <div>
                    <Label
                      htmlFor="role"
                      className="font-normal text-sm text-estate-500 dark:text-muted-foreground"
                    >
                      Role
                    </Label>
                    {isEditing ? (
                      <select
                        id="role"
                        name="role"
                        value={editedUser?.role}
                        onChange={handleInputChange}
                        className="border rounded ml-3 p-1 bg-estate-50"
                      >
                        <option className="text-sm" value="AGENT">
                          AGENT
                        </option>
                        <option className="text-sm" value="USER">
                          USER
                        </option>
                      </select>
                    ) : (
                      <p className="font-medium text-estate-800 dark:text-white">
                        {user?.role}
                      </p>
                    )}
                  </div>
                </div>
                {/*  */}
                <div className="space-y-2 mt-3">
                  <div className="flex items-start">
                    {isEditing && editedUser?.role === "AGENT" ? (
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-Primary/20 dark:bg-Primary/20 flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-Bgpurple " />
                        </div>
                        <div>
                          <Label
                            htmlFor="company"
                            className="font-normal text-sm text-estate-500 dark:text-muted-foreground"
                          >
                            Company
                          </Label>
                          <Textarea
                            id="company"
                            name="company"
                            value={editedUser?.company || " "}
                            onChange={handleInputChange}
                            rows={3}
                          />
                        </div>
                      </div>
                    ) : (
                      user?.role === "AGENT" && (
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-Primary/20 dark:bg-Primary/20 flex items-center justify-center">
                            <MapPin className="h-5 w-5 text-Bgpurple " />
                          </div>
                          <div>
                            <Label
                              htmlFor="company"
                              className="font-normal text-sm text-estate-500 dark:text-muted-foreground"
                            >
                              Company
                            </Label>
                            <p className="font-medium text-estate-800 dark:text-white">
                              {user?.company}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </section>
            {isEditing && (
              <div className="flex space-x-2 py-4  max-md:justify-center">
                <Button
                  onClick={handleUpdate}
                  className="bg-Bgpurple hover:bg-indigo-700 md:w-36 "
                >
                  <Save className="size-4 mr-2" />
                  Save Profile
                </Button>
                <Button
                  variant="outline"
                  className="md:w-36 border-Bgpurple text-Bgpurple px-10"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
        {/* New Appointments Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 w-full gap-6 max-w-6xl mx-auto">
          {" "}
          <Card className="shadow-sm relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-estate-800 dark:text-white">
                  Upcoming Appointments
                </CardTitle>
                <Badge
                  variant="outline"
                  className="bg-azure-100 text-azure-800 dark:bg-Primary/20 dark:text-azure-400 border-none"
                >
                  {appointments.filter((a) => a.status === "upcoming").length}{" "}
                  Total
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {appointments
                  .filter((appointment) => appointment.status === "upcoming")
                  .map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center p-3 rounded-lg border border-estate-100 dark:border-estate-700 hover:bg-estate-50 dark:hover:bg-estate-700/50 transition-colors"
                    >
                      <div className="mr-4 flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-Primary/20 dark:bg-Primary/20 flex flex-col items-center justify-center text-Bgpurple dark:text-Primary">
                          <Calendar className="h-5 w-5 mb-0.5" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-medium text-estate-800 dark:text-white">
                            {appointment.date} • {appointment.time}
                          </h4>
                          <div
                            className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center"
                            title={appointment.property}
                          >
                            <Home className="h-3 w-3 text-emerald-600" />
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div>
                            <p className="text-sm text-estate-600 dark:text-estate-300">
                              {appointment.property}
                            </p>
                            <p className="text-xs text-estate-500 dark:text-muted-foreground">
                              {appointment.address}
                            </p>
                          </div>
                          <p className="font-normal text-sm text-estate-500 dark:text-muted-foreground">
                            With: {appointment.client}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
            {/* Cpoming soon feature */}
            {comingSoon && (
              <div className="absolute inset-0 bg-gradient-to-br from-Bgpurple/80 to-blue-900/80 backdrop-blur-sm flex flex-col items-center justify-center text-white transition-all duration-300 rounded-md">
                <div className="transform rotate-12 bg-Primary  text-white px-6 py-1 font-bold text-sm  rounded-r-sm absolute top-6 right-0">
                  COMING SOON
                </div>

                <div className="flex flex-col items-center p-6 text-center">
                  <div className="bg-white/10 p-4 rounded-full mb-4">
                    <Clock className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    Upcoming Appointments
                  </h3>
                  <p className="text-white/80 mb-6 max-w-xs">
                    {`  We're working on this feature and it will be available in a future update.`}
                  </p>
                  <button className="group relative px-6 py-3 overflow-hidden rounded-lg bg-white/10 text-white shadow backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                    <div className="relative flex items-center gap-2">
                      <LockKeyhole className="h-4 w-4" />
                      <span>Available in Future Update</span>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </Card>
          <Card className="shadow-sm relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-estate-800 dark:text-white">
                  Past Appointments
                </CardTitle>
                <Badge
                  variant="outline"
                  className="bg-estate-100 text-estate-800 dark:bg-estate-700 dark:text-estate-300 border-none"
                >
                  {appointments.filter((a) => a.status === "completed").length}{" "}
                  Total
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {appointments
                  .filter((appointment) => appointment.status === "completed")
                  .map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center p-3 rounded-lg border border-estate-100 dark:border-estate-700 hover:bg-estate-50 dark:hover:bg-estate-700/50 transition-colors"
                    >
                      <div className="mr-4 flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-estate-100 dark:bg-estate-700 flex flex-col items-center justify-center text-estate-600 dark:text-estate-400">
                          <Calendar className="h-5 w-5 mb-0.5" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-medium text-estate-800 dark:text-white">
                            {appointment.date} • {appointment.time}
                          </h4>
                          <div
                            className="h-6 w-6 rounded-full bg-estate-100 flex items-center justify-center"
                            title={appointment.property}
                          >
                            <Home className="h-3 w-3 text-estate-600" />
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div>
                            <p className="text-sm text-estate-600 dark:text-estate-300">
                              {appointment.property}
                            </p>
                            <p className="text-xs text-estate-500 dark:text-muted-foreground">
                              {appointment.address}
                            </p>
                          </div>
                          <p className="font-normal text-sm text-estate-500 dark:text-muted-foreground">
                            With: {appointment.client}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
            {comingSoon && (
              <div className="absolute inset-0 bg-gradient-to-br from-Bgpurple/80 to-blue-900/80 backdrop-blur-sm flex flex-col items-center justify-center text-white transition-all duration-300 rounded-md">
                <div className="transform rotate-12 bg-Primary  text-white px-6 py-1 font-bold text-sm  rounded-r-sm absolute top-6 right-0">
                  COMING SOON
                </div>

                <div className="flex flex-col items-center p-6 text-center">
                  <div className="bg-white/10 p-4 rounded-full mb-4">
                    <Clock className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Past Appointments</h3>
                  <p className="text-white/80 mb-6 max-w-xs">
                    {`  We're working on this feature and it will be available in a future update.`}
                  </p>
                  <button className="group relative px-6 py-3 overflow-hidden rounded-lg bg-white/10 text-white shadow backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                    <div className="relative flex items-center gap-2">
                      <LockKeyhole className="h-4 w-4" />
                      <span>Available in Future Update</span>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </section>
    </section>
  );
}
