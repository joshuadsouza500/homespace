import {
  Heart,
  MoreVertical,
  Bed,
  Bath,
  Maximize,
  MapPin,
  Phone,
  Mail,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
/***/
const BigProperyCard = () => {
  return (
    <Card className="max-w-md md:max-w-5xl mx-1 cursor-pointer hover:shadow-m h-full">
      <div className="flex flex-col gap-1 sm:flex-row">
        <div className="relative w-full sm:w-2/5">
          <img
            src="https://www.wilsonhomes.com.au/sites/default/files/styles/blog_hero_banner/public/My%20project%20-%202023-06-20T095818.329%20%281%29_0.jpg?itok=UbtVbhT0"
            alt="Red house"
            className="w-full h-[240px] sm:h-[350px] object-fill rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none object-center "
          />
          <Badge className="absolute top-2 left-2 bg-green-500 text-white">
            For Sale
          </Badge>

          <div className="absolute bottom-2 left-[45%] flex space-x-1">
            {[1, 2, 3, 4, 5].map((dot) => (
              <div
                key={dot}
                className="w-2 h-2 rounded-full bg-white opacity-60"
              />
            ))}
          </div>
        </div>
        <CardContent className="p-4 sm:w-3/5 flex flex-col justify-between ">
          <div className="relative max-sm:h-72 h-full ">
            <div className="flex justify-between items-start mb-2 relative">
              <div>
                <Badge variant="secondary" className="mb-2">
                  Villa
                </Badge>
                <h2 className="text-2xl font-bold text-Primary">24,000 BHD</h2>
                <h2 className="text-lg font-semibold text-[#000929] pl-1">
                  LakeField Av.
                </h2>
              </div>
              <span className="px-3 py-2 absolute  right-0 bg-Primary text-white font-bold text-xs rounded-lg shadow-sm flex gap-1 items-center">
                <Sparkles className="size-4 fill-white" />
                Popular this week
              </span>
            </div>
            <div className="flex items-center text-muted-foreground text-sm mb-4">
              <MapPin className="h-4 w-4 mr-1 text-Primary flex-shrink-0" />
              <span>Al Juffair, Capital Governorate</span>
            </div>
            <p className="text-muted-foreground w-[90%] text-pretty leading-tight">
              {" "}
              A three bedroom end-terrace home situated on Barns Road, Cowley
              centre within close proximity to public transport services into
              Oxford city centre.{" "}
            </p>
            <div className="flex justify-start gap-2 text-sm text-muted-foreground mb-4 pl-1 absolute bottom-0">
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
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="text-primary">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
              <Button variant="outline" size="sm" className="text-primary">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
              <Button variant="outline" size="icon" className="text-primary">
                <Heart className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default BigProperyCard;
