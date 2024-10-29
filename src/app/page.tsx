import { Capa } from "@/components/capa";
import { Exercicios } from "@/components/exercicios";
import { Sobre } from "@/components/sobre";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div>
      <main>
      <Capa />
      <Separator className="bg-black"/>
      <Sobre />
      <Separator className="bg-black"/>
      <Exercicios />
      </main>
    </div>
  );
}
