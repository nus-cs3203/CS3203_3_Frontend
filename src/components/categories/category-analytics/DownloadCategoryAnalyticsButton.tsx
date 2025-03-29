"use client"
import { Button } from "@/components/ui/button";
import { CategoryAnalytics } from "@/types/CategoryAnalytics";
import { pdf } from "@react-pdf/renderer";
import { CategoryAnalyticsReport } from "./CategoryAnalyticsReport";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast"
import { complaintsGetStatistics } from "@/controllers/ComplaintsFunctions";



/**
This component represents a button that allows users to create and downloa
 */
interface DownloadCategoryAnalyticsButtonProps {
    categoryAnalytics: CategoryAnalytics
}

export default function DownloadCategoryAnalyticsButton({ categoryAnalytics }: DownloadCategoryAnalyticsButtonProps ) {
    const [isLoading, setIsLoading] = useState<boolean>()
    const { toast } = useToast()



    const handleDownload = async () => {
        //Step 1: Set state
        setIsLoading(true)

        //Step 2: Create download toast
        //Show loading toast
        toast({
            variant: "download",
            description: "Download is in progress. Please do not leave this page.",
            duration: Infinity, // Keep it open until download completes
        });


        //Step 3: Fetch number of complaints and average sentiment for the category in the given time period
        const complaintStatistics = await complaintsGetStatistics(
            {
            "category": categoryAnalytics.name,
            "_from_date": "01-10-2024 00:00:00", //TODO: Update again
            "_to_date":  "31-03-2025 23:59:00" //TODO: Update again
            }
        )
        if (complaintStatistics.count < 0 || complaintStatistics.avg_sentiment < 0) {
            toast({
                variant: "destructive",
                description: "There is no poll response.",
                duration: 3000,
            });
            return
        }


        //Step 4: Generate the PDF document
        const blob = await pdf(<CategoryAnalyticsReport categoryAnalytics={ categoryAnalytics } complaintStatistics= { complaintStatistics }/>).toBlob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${categoryAnalytics.name}_CategoryAnalytics.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);


        //STEP 5: Generate success toast
        toast({
            variant: "success",
            description: "Download completed!",
            duration: 3000,
        });

        //Step 6: Set state
        setIsLoading(false)
      };
    
    
      return (
        <Button className='bg-yap-green-900 hover:bg-yap-green-800 duration-200 rounded-full w-fit'
                    onClick={() => handleDownload()} disabled={ isLoading }>{isLoading ? 'Downloading' : 'Download Report'}</Button>
        
      );
   
}
