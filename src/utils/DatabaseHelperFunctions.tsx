import { Category } from "@/types/Category"
import { Complaint } from "@/types/Complaint";

/**
Helper functions to convert database documents into interfaces used in frontend
*/

/**
Converts a list of MongoDB Category documents into a list of Category objects
*/
export const convertCategoryDocumentsToObjects = (categories: any[]) : Category[] => {
    return categories.map(category => ({
        id: category._id.$oid,
        name: category.name,
        colour: category.color
    }));
}

/**
Converts a list of Category objects into a colour map.

{
    "Environment": "#000000"
    "Healthcare": "#AAAAAA"
    ...
}
*/
export const convertCategoryObjectsToColourMap = (categories: any[]): Record<string, string> => {
    return categories.reduce((acc, category) => {
        acc[category.name] = category.colour;
        return acc;
    }, {} as Record<string, string>);
};


/**
Converts a list of MongoDB Category documents into a colour map.

{
    "Environment": "#000000"
    "Healthcare": "#AAAAAA"
    ...
}
*/
export const convertCategoryDocumentsToColourMap = (documents: { name: string; color: string }[]): Record<string, string> => {
    return documents.reduce((acc, doc) => {
        if (doc.name && doc.color) {
            acc[doc.name] = doc.color;
        }
        return acc;
    }, {} as Record<string, string>);
}


/** 
Converts a list of MongoDB Complaint documents into a list of Complaint objects
*/
export const convertComplaintDocumentsToObjects = (complaints: any[]) : Complaint[] => {
    return complaints.map(complaint => ({
        oid: complaint._id.$oid,
        id: complaint.id,
        title: complaint.title,
        description: complaint.description,
        date: complaint.date,
        category: complaint.category,
        source: complaint.source,
        sentiment: complaint.sentiment,
        url: complaint.url
    }));
}