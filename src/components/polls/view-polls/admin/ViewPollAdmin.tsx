"use client"

import { Poll, PollQuestionTypeEnum } from "@/types/Poll"
import { useState, useEffect } from "react"
import BackToPreviousButton from "@/components/common/navigation/BackToPreviousButton"
import { CreatePollButton } from "../../CreatePollButton"
import PageSubtitle from "@/components/common/text/PageSubtitle"
import { Input } from "@/components/ui/input"
import { ViewPollAdminQuestion } from "./ViewPollAdminQuestion"
import { ViewPollAdminCategory } from "./ViewPollAdminCategory"
import { ViewPollAdminQuestionType } from "./ViewPollAdminQuestionType"
import { ViewPollAdminOptions } from "./ViewPollAdminOptions"
import { ViewPollAdminAboutPoll } from "./ViewPollAdminAboutPoll"

/**
Represents a page where the admin can view a poll. Possible actions by the admin depends on the status of the poll.
*/
interface ViewPollAdminProps {
    currentPoll: Poll,

}

export function ViewPollAdmin({ currentPoll }: ViewPollAdminProps) {

    //Poll that is maintained within the current page
    const [poll, setPoll] = useState<Poll>(currentPoll)


    //If the current poll object changes, update the state
    useEffect(() => {
        setPoll(currentPoll); 
    }, [currentPoll]);


    return (
        <div className='flex flex-col space-y-4'>
            {/* Navigate back to all polls */}
            <BackToPreviousButton text='Back to all polls' route='/polls' />


            {/* Action Buttons */}
            <div className='self-end flex-row justify-center items-center'>
                {/* Only show create poll button for new uncreated polls that are not saved in the database yet */}
                {poll.id === -1 && <CreatePollButton currentPoll={ poll } />}
                {/* {poll.id !== -1 && poll.status !== "closed" && <SaveChangesToPollButton currentPoll={ poll } />}
                {poll.id !== -1 && poll.status == 'unpublished' && <PublishPollButton currentPoll={ poll } />}
                {poll.id !== -1 && <DeletePollButton currentPoll={ poll } />} */}
            </div>


            {/* Poll Data */}
            <div className='flex flex-col space-y-12'>
                {/* Question */}
                <ViewPollAdminQuestion currentPoll={ poll } setPoll={ setPoll } />

                {/* Category */}
                <ViewPollAdminCategory currentPoll={ poll } setPoll={ setPoll } />

                {/* Question type */}
                <ViewPollAdminQuestionType currentPoll={ poll } setPoll={ setPoll } />

                {/* Options */}
                {
                    poll.question_type === PollQuestionTypeEnum.MCQ &&
                    <ViewPollAdminOptions currentPoll={ poll } setPoll={ setPoll } />
                }

                {/* Poll Information */}
                <ViewPollAdminAboutPoll currentPoll={ poll } />
            </div>
        </div>
    )
}
