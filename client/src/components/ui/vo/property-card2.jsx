import {
  Heart,
  MoreVertical,
  Bed,
  Bath,
  Maximize,
  MapPin,
  Phone,
  Mail,
  Edit,
  Trash,
  Trash2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
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
} from "../alert-dialog";

export default function PropertyCard2({ update, className }) {
  return (
    <Card
      className={cn(
        "max-w-sm sm:max-w-lg md:max-w-3xl mx-1 lg:h-64 cursor-pointer hover:shadow-md  ",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row lg:h-full">
        <div className="relative w-full sm:w-2/5 ">
          <img
            src="/HomeCard2.png"
            alt="Red house"
            width={400}
            height={300}
            className="w-full h-[200px] sm:h-full object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
          />
          <Badge className="absolute top-2 left-2 bg-green-500 text-white">
            For Sale
          </Badge>
          <div className="absolute bottom-2 left-[38%] flex space-x-1">
            {[1, 2, 3, 4, 5].map((dot) => (
              <div
                key={dot}
                className="w-2 h-2 rounded-full bg-white opacity-60"
              />
            ))}
          </div>
        </div>
        <CardContent className="p-4 sm:w-3/5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <Badge variant="secondary" className="mb-2">
                  Villa
                </Badge>
                <h2 className="text-2xl font-bold text-Bgpurple">68,000 BHD</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center text-muted-foreground text-sm mb-4">
              <MapPin className="h-4 w-4 mr-1 text-Primary flex-shrink-0" />
              <span>Al Juffair, Capital Governorate</span>
            </div>
            <div className="flex justify-start gap-2 text-sm text-muted-foreground mb-4 pl-1">
              <div className="flex items-center border-r-2 pr-2">
                <Bed className="h-4 w-4 mr-1 text-Primary" />
                <span>4</span>
              </div>
              <div className="flex items-center border-r-2 pr-2">
                <Bath className="h-4 w-4 mr-1 text-Primary" />
                <span>5</span>
              </div>
              <div className="flex items-center  pr-2">
                <Maximize className="h-4 w-4 mr-1 text-Primary" />
                <span>600 sqm</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-auto pt-4 border-t">
            <span className="text-xs text-muted-foreground">
              Listed 1 day ago
            </span>
            {update == true ? (
              <div className="flex space-x-2 items-center ">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-24 h-10  font-medium bg-Bgpurple hover:bg-Bgpurple/85 text-white hover:text-white"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-24 font-medium">
                      <Trash2Icon className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete your Property Listing?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your property listing and remove it from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-600">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ) : (
              <div className="flex space-x-2 items-center">
                <Button variant="outline" size="sm" className="text-primary">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline" size="sm" className="text-primary">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
                <Button variant="outline" size="icon" className="text-primary ">
                  <Heart className="size-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
