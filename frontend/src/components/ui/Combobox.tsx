"use client";

import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/libs/utils";

export function CategoryDropdown({ categories, value, onChange }) {
  console.log("📌 Categorias recebidas no DROPDOWN:", categories);
  return (
    <div className="w-full">
      <Listbox value={value} onChange={onChange}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-pointer rounded-md border border-input bg-background py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:border-ring focus:ring-2 focus:ring-ring sm:text-sm">
            <span className="block truncate">
              {value
                ? categories.find((c) => c.id === value)?.nome
                : "Selecione uma categoria"}
            </span>

            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronsUpDown className="h-5 w-5 text-muted-foreground" />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className="
    absolute z-50 
    bottom-full mb-1 
    max-h-60 w-full 
    overflow-auto rounded-md 
    bg-card        /* <<< AQUI RESOLVE A TRANSPARÊNCIA */
    py-1 text-base shadow-lg 
    ring-1 ring-border 
    focus:outline-none sm:text-sm
  "
            >
              {categories.map((cat) => (
                <Listbox.Option
                  key={cat.id}
                  value={cat.id}
                  className={({ active }) =>
                    cn(
                      "relative cursor-default select-none py-2 pl-10 pr-4",
                      active ? "bg-accent text-accent-foreground" : ""
                    )
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={cn(
                          "block truncate",
                          selected ? "font-medium" : "font-normal"
                        )}
                      >
                        {cat.nome}
                      </span>

                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <Check className="h-4 w-4" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
