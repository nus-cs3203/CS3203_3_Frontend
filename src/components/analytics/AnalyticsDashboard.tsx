
/** 
The analytics dashboard component used in the analytics page, housing the different analytics displays
*/

import AnalyticsDashboardTitle from "./AnalyticsDashboardTitle";
import { NumberOfPostsByCategoryOverTimeVisualisation } from "./NumberOfComplaintsByCategoryOverTimeVisualisation";
import { NumberOfComplaintsByCategoryVisualisation } from "./NumberOfComplaintsByCategoryVisualisation";
import { NumberOfComplaintsBySentimentVisualisation } from "./NumberOfComplaintsBySentimentVisualisation";
import { SentimentsOfCategoriesVisualisation } from "./SentimentsOfCategoriesVisualisation";
import { SentimentsOfSourcesVisualisation } from "./SentimentsOfSourcesVisualisation";
import { MostNegativePostsVisualisation } from "./MostNegativeComplaintsVisualisation";
import { SentimentsOfCategoriesOverTimeVisualisation } from "./SentimentsOfCategoriesOverTimeVisualisation";

export default function AnalyticsDashboard() {
    return (
        <div className='grid grid-cols-1 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 gap-y-4'>
            {/* Number of complaints by category */}
            <div className='gap-y-8 bg-yap-gray-100 p-4 rounded-xl col-span-1 xl:col-span-2 overflow-x-hidden'>
                <AnalyticsDashboardTitle title='Number of Complaints by Category' />
                <NumberOfComplaintsByCategoryVisualisation />
            </div>

            {/* Number of complaints by category over time */}
            <div className='gap-y-8 bg-yap-gray-100 p-4 rounded-xl col-span-1 xl:col-span-3 2xl:col-span-4'>
                <AnalyticsDashboardTitle title='Number of Complaints by Category Over Time' />
                <NumberOfPostsByCategoryOverTimeVisualisation />
            </div>

            {/* Sentiment of each category */}
            <div className='gap-y-8 bg-yap-gray-100 p-4 rounded-xl col-span-1 xl:col-span-5 2xl:col-span-6'>
                <AnalyticsDashboardTitle title='Sentiments of Categories' />
                <SentimentsOfCategoriesVisualisation />
            </div>

            {/* Number of complaints by sentiments */}
            <div className='gap-y-8 bg-yap-gray-100 p-4 rounded-xl col-span-1 xl:col-span-3 2xl:col-span-3'>
                <AnalyticsDashboardTitle title='Number of Complaints by Sentiment' />
                <NumberOfComplaintsBySentimentVisualisation />
            </div>

            {/* Sentiment by source */}
            <div className='gap-y-8 bg-yap-gray-100 p-4 rounded-xl col-span-1 xl:col-span-2 2xl:col-span-3'>
                <AnalyticsDashboardTitle title='Sentiments of Sources' />
                <SentimentsOfSourcesVisualisation />
            </div>

            {/* Sentiments of each category over time */}
            <div className='gap-y-8 bg-yap-gray-100 p-4 rounded-xl col-span-1 xl:col-span-5 2xl:col-span-6'>
                <AnalyticsDashboardTitle title='Sentiments of Categories Over Time' />
                <SentimentsOfCategoriesOverTimeVisualisation />
            </div>

            {/* Top 5 negative posts */}
            <div className='gap-y-8 bg-yap-gray-100 p-4 rounded-xl col-span-1 xl:col-span-6'>
                <AnalyticsDashboardTitle title='Most Negative Complaints' />
                <MostNegativePostsVisualisation />
            </div>

        </div>

  );

}
