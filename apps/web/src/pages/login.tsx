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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ShineBorder } from "@/components/ui/shine-border";

import localStorageHelper from "../utils/localStorageHelper";

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [loginFailed, setLoginFailed] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    localStorageHelper.setUser(values);

    try {
      const check = await helloWorld();
      if (check.status === 200) {
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
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Card className="relative w-full overflow-hidden">
                <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
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
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Sign In</Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
