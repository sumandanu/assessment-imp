'use client';

import { useActionState, useEffect, useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { signin } from '@/actions/auth';
import { redirect, useRouter } from 'next/navigation';

export function SignInForm() {
    const router = useRouter();
    const [state, action, pending] = useActionState(signin, undefined);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (state?.success) {
            router.push('/');
        }
    }, [state]);

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">
                    Sign In
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form action={action} className="space-y-4">
                    {state?.errors && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {state?.errors}
                        </div>
                    )}
                    <fieldset className="fieldset">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="pl-10"
                                required
                            />
                        </div>
                        {state?.errors?.email && (
                            <p className="label">{state.errors.email}</p>
                        )}
                    </fieldset>

                    <fieldset className="fieldset">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Enter your password"
                                className="pl-10 pr-10"
                                required
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                )}
                            </Button>
                        </div>
                        {state?.errors?.password && (
                            <p className="label">{state.errors.password}</p>
                        )}
                    </fieldset>

                    <Button
                        type="submit"
                        className="w-full btn btn-block btn-primary"
                        disabled={pending}
                    >
                        {pending ? 'Signing in...' : 'Sign In'}
                    </Button>

                    <div className="text-center text-sm">
                        Don't have an account?{' '}
                        <Button variant="link" className="p-0" asChild>
                            <a href="/signup">Sign up</a>
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
