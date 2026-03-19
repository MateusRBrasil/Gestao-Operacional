import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Shield } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@sgo.com');
  const [password, setPassword] = useState('admin');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(email, password);
    if (!ok) setError('Credenciais inválidas. Use admin@sgo.com ou carlos@sgo.com');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-sm shadow-lg border-border/50">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto h-14 w-14 rounded-xl bg-primary flex items-center justify-center shadow-md">
            <Shield className="h-7 w-7 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold">SGO</CardTitle>
            <CardDescription className="text-sm">Sistema de Gestão Operacional</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••" />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full font-medium">Entrar</Button>
            <div className="rounded-md bg-muted p-3 mt-4">
              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                <span className="font-medium text-foreground">Admin:</span> admin@sgo.com<br />
                <span className="font-medium text-foreground">Gestor:</span> carlos@sgo.com<br />
                <span className="text-[10px]">Qualquer senha</span>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
