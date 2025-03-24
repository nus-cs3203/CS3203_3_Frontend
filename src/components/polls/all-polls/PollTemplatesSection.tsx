"use client"
import PollCard from "../PollCard"
import PageSubtitle from "@/components/common/text/PageSubtitle"
import { PollTemplate } from "@/types/Poll"
import InfoTooltip from "@/components/common/others/InfoTooltip"
import { API_BASE_URL_ADMIN_MANAGEMENT, POLL_TEMPLATES_GET_ALL_ENDPOINT } from "@/constants/ApiRoutes"
import axios from "axios"
import { convertPollTemplateDocumentsToObjects } from "@/utils/DatabaseHelperFunctions"
import useSWR from 'swr'
import PollCardsSkeleton from "../PollCardsSkeleton"
import { ERROR_MESSAGE_API } from "@/constants/Constants"
import { POLL_TEMPLATES_SWR_HOOK } from "@/constants/SwrHooks"


/**
Represents a section within the all polls page that displays the existing poll templates
*/

//Function to fetch all poll templates
const fetchAllPollTemplates = async() : Promise<PollTemplate[]> => {
    const getAllPollTemplatesEndpoint = API_BASE_URL_ADMIN_MANAGEMENT  + POLL_TEMPLATES_GET_ALL_ENDPOINT
    const pollTemplatesData = await axios.post(getAllPollTemplatesEndpoint)
    const pollTemplates = convertPollTemplateDocumentsToObjects(pollTemplatesData.data.documents)
    return pollTemplates
}

export default function PollTemplatesSection() {
    const { data, error, isLoading } = useSWR<PollTemplate[]>(POLL_TEMPLATES_SWR_HOOK, fetchAllPollTemplates);
    
    return (
        <div className='flex flex-col space-y-6'>
            <div className='flex flex-row gap-2 items-center'>
                <PageSubtitle pageSubtitle='Poll Templates' />
                <InfoTooltip message='We analyse past complaints and leverage AI to suggest possible polls to be created.' />
            </div>
            {
                isLoading
                ? <PollCardsSkeleton />
                : error
                ? <div className='text-base text-yap-black-800'>{ ERROR_MESSAGE_API }</div>
                : data?.length === 0
                ? <div className='text-yap-black-800'>There is no poll template.</div>
                :  <div className='grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 grid-rows-1 gap-x-4 gap-y-4'>
                        {data?.map((pollTemplate) => (
                            <PollCard key={pollTemplate.id} pollToDisplay={pollTemplate} />
                        ))}
                   </div>
            }
        </div>
    )
}
