"use client";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Eye, EyeOff } from "lucide-react";

export function PasswordInput(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative w-full flex items-center">
      <Input {...props} type={show ? "text" : "password"} />

      <div className="absolute right-3 cursor-pointer z-50">
        {show ? (
          <EyeOff
            className="h-5 w-5 text-muted-foreground hover:text-foreground"
            onClick={() => setShow(false)}
          />
        ) : (
          <Eye
            className="h-5 w-5 text-muted-foreground hover:text-foreground"
            onClick={() => setShow(true)}
          />
        )}
      </div>
    </div>
  );
}
