import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../UI/ShadCN/alert-dialog";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/UI/ShadCN/button";

// eslint-disable-next-line react/prop-types
export function UpdateSuccessDialog({ isOpen, setIsOpen, propertyId }) {
  const navigate = useNavigate();

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Property Updated Successfully!</AlertDialogTitle>
          <AlertDialogDescription>
            Your property has been updated. What would you like to do next?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Go Back
          </Button>
          <Button
            className="bg-Bgpurple"
            onClick={() => navigate(`/property/${propertyId}`)}
          >
            View Property
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
