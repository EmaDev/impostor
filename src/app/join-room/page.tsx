import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FloatingIcons } from '@/components/icons/FloatingIcons';

export default function JoinRoomPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-4 sm:p-8">
        <FloatingIcons />
        <Card className="z-10 w-full max-w-md rounded-2xl bg-card/80 shadow-2xl backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-center text-3xl font-bold">Unirse a Sala</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="space-y-2">
                    <Label htmlFor="room-code">Código de la Sala</Label>
                    <Input id="room-code" placeholder="Ingresa el código..." />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="player-name">Tu Nombre</Label>
                    <Input id="player-name" placeholder="Ingresa tu nombre..." />
                </div>
                <Button size="lg" className="w-full text-lg font-bold">
                    Entrar
                </Button>
            </CardContent>
        </Card>
    </main>
  );
}
