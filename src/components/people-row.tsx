import { PersonCard } from "@/components/person-card";

interface Person {
  id: string;
  name: string;
  relationship: string;
}

export function PeopleRow({ people }: { people: Person[] }) {
  return (
    <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-none">
      {people.map((person) => (
        <PersonCard
          key={person.id}
          id={person.id}
          name={person.name}
          relationship={person.relationship}
        />
      ))}
    </div>
  );
}
