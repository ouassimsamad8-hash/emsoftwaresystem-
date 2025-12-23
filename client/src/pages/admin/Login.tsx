import { FormEvent, useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/lib/admin-auth-context";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { login, isAuthenticated, isLoading: authLoading } = useAdminAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState({ username: "", password: "" });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await login(formState);
      toast({
        title: "Connected",
        description: "Authentication successful.",
      });
      navigate("/admin");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to authenticate";
      toast({
        title: "Login failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isSubmitting = isLoading || authLoading;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground">E&M Software Admin</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Restricted access. Use your administrator credentials to continue.
          </p>
        </div>
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>Enter the credentials shared by the engineering team.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  autoComplete="username"
                  required
                  value={formState.username}
                  onChange={(event) => setFormState((prev) => ({ ...prev, username: event.target.value }))}
                  placeholder="admin"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formState.password}
                  onChange={(event) => setFormState((prev) => ({ ...prev, password: event.target.value }))}
                  placeholder="••••••••"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Signing in…" : "Access dashboard"}
              </Button>
            </form>
          </CardContent>
        </Card>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Optionally enable multi-factor authentication from the security settings once connected.
        </p>
      </div>
    </div>
  );
}
