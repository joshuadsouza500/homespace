import "./App.css";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/common/Loader"; //dynamically loads when route is navigated to
import { NotFound } from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import CustomerRoutes from "./components/CustomerRoutes";
const SignIn = lazy(() => import("./pages/SignIn"));
const User = lazy(() => import("./pages/User"));

function App() {
  return (
    <div className=" w-full ">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/user/*" element={<User />} />
          <Route path="/*" element={<CustomerRoutes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

/* Part 3:  Optimize  */

/* While testing chat feature in development change frontend io(localhost) in chatcomponent  and at chatview */
{
  /**
   * THINGS TO ADD 
   * smooth scroll

   * EXTRAS:
 
   * Add google auth
   * Maybe integrate CI CD
   * Add Property add ability to add bullet points bold etc to description bar Sanitize , react quill {Sanitize in frontend before      sending to backend just for security}
   
   */
}
