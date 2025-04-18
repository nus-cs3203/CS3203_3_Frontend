"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"


interface CategoryMultiSelectProps {
    allLabels: string[],
    selectedLabels: string[],
    setSelectedLabels: React.Dispatch<React.SetStateAction<string[]>>,
}

export function CategoryMultiSelect({ allLabels, selectedLabels, setSelectedLabels }: CategoryMultiSelectProps) {
    // Toast management
    const { toast } = useToast();
    const [open, setOpen] = useState(false); // Manage dropdown state

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="font-normal bg-white hover:bg-yap-brown-100 border-yap-brown-200 duration-200 w-[150px]">
                    Select Category
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" onCloseAutoFocus={(e) => e.preventDefault()}>
                {allLabels.map((label) => (
                    <DropdownMenuCheckboxItem
                        key={label}
                        className="text-yap-black-800 font-afacad text-sm"
                        checked={selectedLabels.includes(label)}
                        onCheckedChange={() => {
                            // If there is only one item left, prevent unselecting it
                            if (selectedLabels.length === 1 && selectedLabels.includes(label)) {
                                toast({
                                    variant: "destructive",
                                    description: "You must select at least 1 option.",
                                    duration: 3000,
                                });
                                return;
                            }
                            setSelectedLabels((prevSelected) =>
                                prevSelected.includes(label)
                                    ? prevSelected.filter((item) => item !== label) // Remove if already selected
                                    : [...prevSelected, label] // Add if not selected
                            );

                            // Keep dropdown open
                            setOpen(true);
                        }}
                        // Prevent closing when clicking on the checkbox
                        onSelect={(e) => e.preventDefault()}
                    >
                        {label}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}