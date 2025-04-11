"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { LineChartMultiple } from "@/components/charts/LineChartMultiple"
import { LineChartMultiplePoint } from "@/types/ChartInterface"
import { getDateTimeOneYearAgoAndSetToStart, getDateTimeOneMonthAgoAndSetToEnd } from "@/utils/HelperFunctions"
import { COLOUR_MAP } from "@/constants/Constants"
import useSWR from "swr"
import { Category } from "@/types/Category"
import { CATEGORIES_GET_ALL_SWR_HOOK, COMPLAINTS_GET_STATISTICS_OVER_TIME_SWR_HOOK } from "@/constants/SwrHooks"
import { categoriesGetAll } from "@/data-fetchers/CategoriesFunctions"
import { MonthlyComplaintStatistics } from "@/types/Complaint"
import { complaintsGetStatisticsOverTime } from "@/data-fetchers/ComplaintsFunctions"

/**
This component is used to generate and visualise the sentiment over time graph shown in the category analytics page.
It is for per category.
*/

//Adapter function that converts the raw API data into line chart multiple data points
const transformIntoLineChartDataPoints = (input: any[], categoryName: string) => {
    const sentimentData = input.map(({ date, data }) => ({
        date,
        [categoryName]: data.avg_sentiment,
    }))

    return sentimentData
}


interface CategoryAnalyticsGraphsProps {
    categoryName: string
}


export default function CategoryAnalyticsSentimentOverTime({ categoryName }: CategoryAnalyticsGraphsProps) {
    //Constants
    const filter = {
        "category": categoryName,
        "_from_date": getDateTimeOneYearAgoAndSetToStart(),
        "_to_date": getDateTimeOneMonthAgoAndSetToEnd(),
    }


    //SWR hooks to fetch data
    const { data: complaintStatistics, error: complaintStatisticsError, isLoading: complaintStatisticsIsLoading } = useSWR<MonthlyComplaintStatistics[]>(
        [COMPLAINTS_GET_STATISTICS_OVER_TIME_SWR_HOOK, filter],
        () => complaintsGetStatisticsOverTime(filter)
    )
    const { data: categories, error: categoriesError, isLoading: categoriesIsLoading } = useSWR<Category[]>(CATEGORIES_GET_ALL_SWR_HOOK, categoriesGetAll)


    //Process API data
    const dataPoints: LineChartMultiplePoint[] = complaintStatistics && categories
                                                 ? transformIntoLineChartDataPoints(complaintStatistics, categoryName)
                                                 : []
    const colourMap = categories
                      ? { [categoryName]: categories.find(cat => cat.name === categoryName)?.colour ?? COLOUR_MAP['yap-green-900']}
                      : {[categoryName]: COLOUR_MAP['yap-green-900']}
                                                  
    
    return (
        complaintStatisticsIsLoading || categoriesIsLoading
        ? (<Skeleton className="w-full h-[200px]" />)
        : complaintStatisticsError || categoriesError || complaintStatistics === undefined || categories === undefined || categories.length === 0
        ? <div>Something went wrong. Please try again later.</div>
        : (
            <div className='flex flex-col space-y-8 w-full'>
                <LineChartMultiple chartData={ dataPoints } colourMap={ colourMap } />     
            </div>
        )
    )
}
