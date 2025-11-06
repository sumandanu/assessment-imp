'use client';

import { useActionState, useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { signup } from '@/actions/auth';

export function SignUpForm() {
    const [state, action, pending] = useActionState(signup, undefined);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">
                    Sign Up
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form action={action} className="space-y-4">
                    <fieldset className="fieldset">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="name"
                                name="name"
                                placeholder="Enter your full name"
                                defaultValue={
                                    (state?.payload?.name || '') as string
                                }
                                className="pl-10"
                                required
                            />
                        </div>
                        {state?.errors?.name && (
                            <p className="label">{state.errors.name}</p>
                        )}
                    </fieldset>

                    <fieldset className="fieldset">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="off"
                                placeholder="Enter your email"
                                defaultValue={
                                    (state?.payload?.email || '') as string
                                }
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
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                defaultValue={
                                    (state?.payload?.password || '') as string
                                }
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

                    <fieldset className="fieldset">
                        <Label htmlFor="password_confirmation">
                            Confirm Password
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="password_confirmation"
                                name="password_confirmation"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm your password"
                                defaultValue={
                                    (state?.payload?.password_confirmation ||
                                        '') as string
                                }
                                className="pl-10 pr-10"
                                required
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                )}
                            </Button>
                        </div>
                        {state?.errors?.password_confirmation && (
                            <p className="label">
                                {state.errors.password_confirmation}
                            </p>
                        )}
                    </fieldset>

                    <Button
                        type="submit"
                        className="w-full btn btn-block btn-primary"
                        disabled={pending}
                    >
                        {pending ? 'Creating account...' : 'Sign Up'}
                    </Button>

                    <div className="text-center text-sm">
                        Already have an account?{' '}
                        <Button variant="link" className="p-0" asChild>
                            <a href="/signin">Sign in</a>
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
