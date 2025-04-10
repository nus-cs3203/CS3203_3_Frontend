import { ABOUT_JUST_YAP } from "@/constants/Constants";
import StrikethroughImage from '../../../public/graphics/strike-through.svg'
import Image from "next/image";
import { HomeStatistics } from "./HomeStatistics";
import { COMPLAINTS_GET_COUNT_SWR_HOOK, POLL_RESPONSES_GET_COUNT_SWR_HOOK } from "@/constants/SwrHooks";

/** 
Component for the left column in the home page. Displays:
- Title
- About Just Yap!
- Statistics on number of complaints processed and number of responses
*/
export default function HomeLeftColumn() {
    return (
        <div className="flex flex-col justify-center space-y-6 xl:space-y-12 row-span-1 col-span-1 xl:col-span-3">
            {/* Title */}
            <div className="flex flex-col space-y-2">
                <h1 className="text-yap-brown-900 font-bold text-3xl sm:text-4xl 2xl:text-5xl relative">
                    People yap and have <span className="inline-block relative">
                        complaints.
                        <Image 
                            src={StrikethroughImage} 
                            alt="Strikethrough" 
                            className="absolute top-4 left-4 2xl:left-6 w-4/5"
                        />
                        <span className="absolute -right-32 homesmall:-top-12 homesmall:left-4 md:-right-36 lg:-top-12 lg:left-4 text-yap-green-900 font-bold text-3xl sm:text-4xl 2xl:text-5xl w-fit">feedback</span>
                    </span>
                </h1>

                <h1 className='text-yap-brown-900 font-bold text-3xl sm:text-4xl 2xl:text-5xl'>Here, we turn it into data that matters.</h1>
            </div>

            {/* Explanation of what Just Yap! is */}
            <p className='text-yap-black-800 text-base xl:w-4/5 2xl:text-lg'>{ ABOUT_JUST_YAP }</p>


            {/* Statistics */}
            <div className='flex flex-row justify-start items-center space-x-12 sm:space-x-24'>
                <HomeStatistics
                    initialDisplayCount={ 8500 }
                    maxValue={ 10000 }
                    statsDescription={ 'complaints processed' }
                    fetcherKey={ COMPLAINTS_GET_COUNT_SWR_HOOK }
                />
                <HomeStatistics 
                    initialDisplayCount={ 120 }
                    maxValue={ 1000 }
                    statsDescription={ 'citizen responses collected' } 
                    fetcherKey={ POLL_RESPONSES_GET_COUNT_SWR_HOOK }
                />
            </div>
        </div>
  );
}
