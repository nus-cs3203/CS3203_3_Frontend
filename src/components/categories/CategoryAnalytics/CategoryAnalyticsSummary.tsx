import PageSubtitle from "@/components/common/text/PageSubtitle"
import AiTooltip from "@/components/common/others/AiTooltip"

/**
This component is used to display the summary text of a given category
in the category analytics page.
*/
interface CategoryAnalyticsSummaryProps {
    summary: string
}


export default function CategoryAnalyticsSummary({ summary }: CategoryAnalyticsSummaryProps) {
    return (
        <div className='paragraph-container'>
            <div className='flex flex-row space-x-4 items-center'>
                <PageSubtitle pageSubtitle="Key Summary" />
                <AiTooltip message='This summary is AI-generated.' />
            </div>
            <p>{ summary }</p>
        </div>
    )
}
