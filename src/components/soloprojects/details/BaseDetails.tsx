'use client'

import {Submission, VoyageRole} from "@/types/SoloProjectTypes";
import {Button} from "@/components/ui/button";
import {Check, ChevronsUpDown, Copy, PencilLine, XCircle} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command";
import {evalStatusValues} from "@/lib/options";
import {cn} from "@/lib/utils";
import {useEffect, useState} from "react";
import {ActionResponse} from "@/types";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {toast} from "react-hot-toast";
import {getRandomPassMessage} from "@/lib/getRandomPassMessage";
import {getRole} from "@/lib/getRole";
import DeveloperDetails from "@/components/soloprojects/details/Developer";
import SMDetails from "@/components/soloprojects/details/SMDetails";
import PODetails from "@/components/soloprojects/details/PODetails";
import UIUXDetails from "@/components/soloprojects/details/UIUXDetails";
import { BaseDetailHeader } from "@/components/soloprojects/details/BaseDetailsHeader";

interface ProjectDetailProps {
    record: Submission,
    handleSave: (evalNotes: string, evalStatus: string) => Promise<ActionResponse>
    handleSetEvaluator: () => Promise<ActionResponse>
    handleRemoveEvaluator: () => Promise<ActionResponse>
}

const ProjectSubmissionDetail = (
    {record, handleSave, handleSetEvaluator, handleRemoveEvaluator}: ProjectDetailProps
) => {
    const [evaluator, setEvaluator] = useState('')
    const [evalNotes, setEvalNotes] = useState('');
    const [statusOpen, setStatusOpen] = useState(false)
    const [evalStatus, setEvalStatus] = useState('')
    const [ringTheBellText, setRingTheBellText] = useState('')
    const [selectionLen, setSelectionLen] = useState(0)

    useEffect(() => {
        if (record) {
            setEvalNotes(record.fields['Evaluation Feedback']);
            setEvaluator(record.fields.Evaluator)
            setEvalStatus(record.fields["Evaluation Status"])
        }
    }, [record]);

    const handleSaveLocal = async () => {
        const savingToast = toast.loading('Saving...')
        const res = await handleSave(evalNotes, evalStatus)
        if (res.success) {
            toast.success(`Saved. Status: ${res.data?.fields["Evaluation Status"]}`)
        } else {
            toast.error(`Error Saving: ${res.message}`)
        }
        toast.dismiss(savingToast)
    }

    const handleSetEvaluatorLocal = async () => {
        const setEvaluatorToast = toast.loading('Setting Evaluator...')
        const res = await handleSetEvaluator()
        if (res.success) {
            setEvaluator(res.data?.fields.Evaluator as string)
            toast.success(`Evaluator set to ${res.data?.fields.Evaluator}`)
        } else {
            toast.error(`Set Evaluator FAILED: ${res.message}`)
        }
        toast.dismiss(setEvaluatorToast)
    }

    const handleRemoveEvaluatorLocal = async () => {
        const removeEvaluatorToast = toast.loading('Removing Evaluator...')
        const res = await handleRemoveEvaluator()
        if (res.success) {
            setEvaluator('')
            toast.success('Removed Evaluator')
        } else {
            toast.error(`Remove evaluator FAILED: ${res.message}`)
        }
        toast.dismiss(removeEvaluatorToast)
    }

    const onPassSelect = () => {
        setRingTheBellText(getRandomPassMessage(record.fields["Discord Name"]))
    }

    const onSelectText = () => {
        const selection = window.getSelection()?.toString()
        if (selection && selection !== '') {
            setSelectionLen(selection.length)
        } else {
            setSelectionLen(0)
        }
    }

    const getRoleComponent = (role:VoyageRole) => {
        switch (role) {
            case "Software Developer":
            case "Developer":
                return <DeveloperDetails fields={record.fields} />
            case "Scrum Master":
                return <SMDetails fields={record.fields}/>
            case "Product Owner":
                return <PODetails fields={record.fields}/>
            case "UI/UX Designer":
            case "UI / UX Designer":
                return <UIUXDetails fields={record.fields} />
            case "Data Scientist":
                return <DeveloperDetails fields={record.fields} />
        }
    }



    return <div>
        <section className="flex flex-col gap-5 w-[90%] mx-auto">
            <BaseDetailHeader record={record} />
            <div>{record.fields["Timestamp"].toString()}</div>
            <div>{record.fields.Tier}</div>
            {record.fields["Instructions"] ?
                <div>
                    <div className="text-gray-500">Instructions:</div>
                    <div>{record.fields["Instructions"]} </div>
                </div>
                : null
            }
            {record.fields["Addl. Comments"] ?
                <div>
                    <div className="text-gray-500">Additional Comments:</div>
                    <div>{record.fields["Addl. Comments"]} </div>
                </div>
                : null
            }

            <div className="flex">
                <div className="mr-3">Evaluator:</div>
                <div>{evaluator}</div>
                {evaluator&&<XCircle color="#A30000" className="ml-2 cursor-pointer" onClick={handleRemoveEvaluatorLocal}/>}
            </div>


            <Button className="bg-green-700 light:text-white-200 hover:bg-green-900 disabled:bg-gray-500"
                    disabled={!!evaluator}
                    onClick={handleSetEvaluatorLocal}
            >
                <PencilLine className="mr-2 h-4 w-4"/>
                Evaluate This
            </Button>

            {
                getRoleComponent(getRole(record.fields))
            }

            <Textarea
                className="h-[500px]"
                value={evalNotes}
                onChange={e => setEvalNotes(e.target.value)}
                onMouseUp={onSelectText}
            />
            <div className="text-right text-gray-500">
                {selectionLen}/{evalNotes?.length ?? '0'}
            </div>

            <div className="flex gap-5 items-center">
                <div>Evaluation Status</div>
                <Popover open={statusOpen} onOpenChange={setStatusOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={statusOpen}
                            className="w-[200px] justify-between"
                        >
                            {evalStatus}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput placeholder="Search status..."/>
                            <CommandEmpty>No status found.</CommandEmpty>
                            <CommandGroup>
                                {evalStatusValues.map((status) => (
                                    <CommandItem
                                        key={status.value}
                                        onSelect={(_) => {
                                            setEvalStatus(status.value)
                                            if (status.value === "Passed") {
                                                onPassSelect()
                                            }
                                            setStatusOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                evalStatus === status.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {status.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
            {evalStatus === "Passed"
                ? <div className="whitespace-pre-line">
                    {ringTheBellText}
                    <CopyToClipboard text={ringTheBellText}>
                        <Button
                            variant="outline"
                            size="icon"
                            className="ml-2 h-8 w-8"
                            onClick={() => toast('Copied!')}
                        >
                            <Copy className="h-4 w-4"/>
                        </Button>
                    </CopyToClipboard>
                </div>
                : null
            }
            <Button
                onClick={handleSaveLocal}
            >Save</Button>
        </section>
    </div>
}

export default ProjectSubmissionDetail