import {
  Heart,
  MoreVertical,
  Bed,
  Bath,
  Maximize,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SmallPropertyCard() {
  return (
    <Card className="max-w-md mx-auto">
      <div className="relative">
        <img
          src="/HomeCard.png"
          alt="Red house"
          width={400}
          height={300}
          className="w-full h-[200px] object-cover rounded-t-lg"
        />
        <Badge className="absolute top-2 left-2 bg-green-500 text-white">
          For Sale
        </Badge>
        <div className="absolute bottom-2 left-2 flex space-x-1">
          {[1, 2, 3, 4, 5].map((dot) => (
            <div
              key={dot}
              className="w-2 h-2 rounded-full bg-white opacity-60"
            />
          ))}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="text-2xl font-bold text-primary">68,000 BHD</h2>
            <Badge variant="secondary" className="mt-1">
              Villa
            </Badge>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center text-muted-foreground text-sm mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span>Al Juffair, Capital Governorate</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>4</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>5</span>
          </div>
          <div className="flex items-center">
            <Maximize className="h-4 w-4 mr-1" />
            <span>600 sqm</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">Listed 1 day ago</span>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Mail className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
