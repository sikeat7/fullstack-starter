import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8">
      <h1 className="text-4xl font-bold">B2B SaaS Platform</h1>
      <p className="text-muted-foreground">Proyecto base con Next.js + Shadcn/ui</p>

      <div className="flex gap-4 flex-wrap">
        <Button variant="default">Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        </div>
    </div>
  );
}
