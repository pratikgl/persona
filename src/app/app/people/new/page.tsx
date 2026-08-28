import { AddPersonForm } from "@/components/add-person-form";

export default function NewPersonPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-12">
      <h1 className="font-serif text-3xl">Add someone</h1>
      <p className="mt-2 text-text-secondary">
        Someone you want to remember the little things about.
      </p>
      <div className="mt-8">
        <AddPersonForm />
      </div>
    </div>
  );
}
