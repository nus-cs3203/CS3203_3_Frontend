"use client"

import { useState, useEffect } from "react"
import { useParams } from 'next/navigation'
import PageTitle from "@/components/common/text/PageTitle"
import { Skeleton } from "@/components/ui/skeleton"
import CategoryAnalyticsSummary from "./overview/CategoryAnalyticsSummary"
import CategoryAnalyticsTrendingKeywords from "./overview/CategoryAnalyticsTrendingKeywords"
import CategoryAnalyticsAbsaResults from "./overview/CategoryAnalyticsAbsaResults"
import CategoryAnalyticsTwoColumnText from "./overview/CategoryAnalyticsTwoColumnText"
import CategoryAnalyticsMostNegativeComplaints from "./tables/CategoryAnalyticsMostNegativeComplaints"
import CategoryAnalyticsStatistics from "./statistics/CategoryAnalyticsStatistics"
import CategoryAnalyticsGraphsContainer from "./graphs/CategoryAnalyticsGraphsContainer"
import { CategoryAnalytics } from "@/types/CategoryAnalytics"
import { API_BASE_URL_ANALYTICS, CATEGORY_ANALYTICS_GET_BY_NAME, } from "@/constants/ApiRoutes"
import axios from "axios"
import useSWR from "swr"
import { CATEGORY_ANALYTICS_GET_BY_NAME_SWR_HOOK } from "@/constants/SwrHooks"
import { categoryAnalyticsGetByName } from "@/controllers/CategoryAnalyticsFunctions"


/**
This component represents the body for viewing the analytics of a particular category.
It houses the other components that showcase different analytics for the given category.
*/
interface CategoryAnalyticsBodyProps {
    categoryName: string
}


export default function CategoryAnalyticsBody({ categoryName }: CategoryAnalyticsBodyProps) {
    //States
    const { data: currentCategoryAnalytics, error, isLoading } = useSWR(`CATEGORY_ANALYTICS_GET_BY_NAME_SWR_HOOK/${ categoryName }`, () => categoryAnalyticsGetByName(categoryName))
   
  
    return (
        isLoading
        ? (<Skeleton className='w-full h-[100px]' />)
        : error || currentCategoryAnalytics === undefined
        ? <div>Something went wrong in fetching the category analytics. Check if the analytics exist for the given category.</div>
        : (
            <div className='flex flex-col space-y-12'>
                {/* Page title */}
                <PageTitle pageTitle={`Analytics on ${ currentCategoryAnalytics?.name}`} />

                {/* Key summary */}
                <CategoryAnalyticsSummary summary={ currentCategoryAnalytics.summary } />

                {/* Trending keywords */}
                <CategoryAnalyticsTrendingKeywords keywords={ currentCategoryAnalytics.keywords } />

                {/* ABSA Result */}
                <CategoryAnalyticsAbsaResults absaResults={ currentCategoryAnalytics.absa_result } />

                {/* Concerns and suggestions */}
                <div className='grid grid-row-1 grid-cols-2 gap-12'>
                    <CategoryAnalyticsTwoColumnText
                        title="Concerns"
                        content={ currentCategoryAnalytics.concerns }
                        aiMessage="The concerns are AI-generated."
                        emptyMessage="No concerns can be generated."
                    />
                    <CategoryAnalyticsTwoColumnText
                        title="Suggestions"
                        content={ currentCategoryAnalytics.suggestions }
                        aiMessage="The suggestions are AI-generated."
                        emptyMessage="No suggestions can be generated."
                    />
                </div>

                {/* Most negative complaints */}
                <CategoryAnalyticsMostNegativeComplaints categoryName={ currentCategoryAnalytics.name } />


                {/* Statistics */}
                <CategoryAnalyticsStatistics categoryName={ currentCategoryAnalytics.name } forecastedSentiment={ currentCategoryAnalytics.forecasted_sentiment }/>

                {/* Graphs */}
                <CategoryAnalyticsGraphsContainer categoryName={currentCategoryAnalytics.name } />
                
            </div>

        )
  )
}
