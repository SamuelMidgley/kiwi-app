import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "@tanstack/react-router";
import { CircleAlert } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

import { helloWorld } from "@/api/hello-world";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/use-auth";

import { ShineBorder } from "../ui/shine-border";

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const LoginDialogContent = () => {
  const { login } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [loginFailed, setLoginFailed] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const check = await helloWorld(values.username, values.password);
      if (check.status === 200) {
        login(values.username, values.password);

        setLoginFailed(false);

        redirect({
          to: "/",
        });
      } else {
        setLoginFailed(true);
      }
    } catch {
      setLoginFailed(true);
    }
  };

  return (
    <DialogContent>
      <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>
              Enter your credentials to access your account
            </DialogDescription>
          </DialogHeader>

          {loginFailed && (
            <Alert variant="destructive">
              <CircleAlert />
              <AlertTitle>Login failed</AlertTitle>
              <AlertDescription>
                Ensure username and password are correct
              </AlertDescription>
            </Alert>
          )}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button className="w-full" type="submit">
              Log In
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
