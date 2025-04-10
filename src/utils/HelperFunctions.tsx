import { Complaint } from "@/types/Complaint";
import { Category } from "@/types/Category";
import { Poll, PollTemplate } from "@/types/Poll";
import { PollQuestionTypeEnum } from "@/types/Poll";
import { ERROR_MESSAGES_POLL_VALIDATION } from "@/constants/Constants";
import { POSSIBLE_COLLECTIBLE_PATHS } from "@/constants/Constants";


/**
    Helper functions that are used across different files
*/


//Gets the current datetime in the format of dd-mm-YYYY HH:MM:SS
//Taken from ChatGPT
export const getCurrentDateTime = (): string => {
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    })
    .format(new Date())
    .replace(/\//g, "-") // Replace slashes with hyphens
    .replace(",", "");  // Remove the comma between date and time
};


/**
Gets the datetime that is 1 year ago from the current datetime in the
format of dd-mm-YYYY HH:MM:SS Then, set the day and time to the first
day of that month.

Taken from ChatGPT
*/
export const getDateTimeOneYearAgoAndSetToStart = (): string => {
    //Subtract 1 year
    const now = new Date();
    now.setFullYear(now.getFullYear() - 1);

    //Set to very start of the month
    now.setDate(1);
    now.setHours(0, 0, 0, 0);

    //Format
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    })
    .format(now)
    .replace(/\//g, "-") 
    .replace(",", "");
};


/**
Gets the datetime that is 1 month ago from the current datetime in the
format of dd-mm-YYYY HH:MM:SS. Then, set the day and time to the last
day of that month.

Taken from ChatGPT.
*/
export const getDateTimeOneMonthAgoAndSetToEnd = (): string => {
    // Get the current date
    const now = new Date();

    // Reset to the 1st of the current month before changing the month
    now.setDate(1);
    now.setMonth(now.getMonth() - 1);

    // Get the last day of the previous month
    const lastDayOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    lastDayOfPreviousMonth.setHours(23, 59, 59, 999);

    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    })
    .format(lastDayOfPreviousMonth)
    .replace(/\//g, "-")  
    .replace(",", "");    
};


//Capitalises the first character of every word in a given string
//Taken from https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
export const capitaliseFirstLetter = (val: string) => {
    const trimmedVal = String(val).trim(); // Remove leading or trailing spaces
    return trimmedVal.charAt(0).toUpperCase() + trimmedVal.slice(1);
}


/**
Check if a given Complaint is found in a list of Complaints by comparing the oid value.
*/
export const doesComplaintExistInList = (complaints: Complaint[], complaintToCheck: Complaint): boolean => {
    return complaints.some(c => c.oid === complaintToCheck.oid);
};


/**
* Find a given Category object from a list of Category objects by matching name
* 
* @param categories: List of Category objects to search from
* @param name: Name of category to use for searching
* 
* @return The given Category object is found, else null
*/
export const findCategoryObjectFromListGivenName = (categories: Category[], name: string): Category | null => {
    const foundCategory = categories.find(category => category.name === name);
    return foundCategory || null;
}


/**
 * Helper function to determine if a given poll is a Poll or PollTemplate
 * 
 * @param poll A Poll or PollTemplate object to check
 * 
 * @returns true if it is a poll, false if it is a poll template
 */

export const determineIsPollOrPollTemplate = (poll: Poll | PollTemplate): poll is Poll => {
    return !("reasoning" in poll)
}


/**
 * Checks if a given input is an empty object, {}
 * 
 * @param inputObject The object to check
 * 
 * @returns true if the object is empty, else false
 */
export const determineIsObjectEmpty = (inputObject: any) => {
    return  (Object.keys(inputObject).length === 0 && inputObject.constructor === Object)
}


/**
 * Adds a string into a list of strings if the string is absent.
 * 
 * @param stringToAdd The string to add
 * 
 * @return The new list
 */
export const addStringToListIfAbsent = (list: string[], item: string): string[] => {
    if (!list.includes(item)) {
        return [...list, item];
    }
    return list;
}


/**
 * Checks if there are any duplicated strings in a list of strings
 * 
 * @param listOfStrings The list to check
 * @returns true if there is a duplicate, else false
 */
export function hasDuplicateStrings(listOfStrings: string[]): boolean {
    const setOfStrings = new Set<string>();

    for (const str of listOfStrings) {
        if (setOfStrings.has(str)) {
            // Found a duplicate
            return true;
        }
        setOfStrings.add(str);
    }

    // No duplicates found
    return false;
}



/**
 * Checks if a given poll is ready to be updated. A poll is ready to be updated if it meets certain criteria.
 * 
 * @param poll The poll to check
 * 
 * @return An error message string which will be empty if there is no error
 */
export const validatePollBeforeUpdating = (poll: Poll): string => {
    let errorMessage = ''

    if (poll.question.trim() === '') {
        //CHECK 1: Poll question cannot be empty
        errorMessage = ERROR_MESSAGES_POLL_VALIDATION.emptyQuestion
    }
    else if (poll.category.trim() === '') {
        //CHECK 2: Category cannot be empty
        errorMessage = ERROR_MESSAGES_POLL_VALIDATION.emptyCategory
    } else if (poll.question_type === PollQuestionTypeEnum.MCQ && poll.options.length <= 1) {
        //CHECK 3: Must have at least 2 options if the question is a MCQ
        errorMessage = ERROR_MESSAGES_POLL_VALIDATION.insufficientOptions
    } else if (poll.question_type === PollQuestionTypeEnum.MCQ) {
        //CHECK 4: Check if there are duplicate entries in the MCQ
        errorMessage = (hasDuplicateStrings(poll.options)) ? ERROR_MESSAGES_POLL_VALIDATION.duplicatedOptions : ''
    }
    return errorMessage
}


/**
 * Filters complaints with dates that fall within a given range 
 * 
 * @param startDate: Start date of the range in the form of a string dd-MM-YYYY HH:MM:SS
 * @param endDate: End date of the range in the form of a string dd-MM-YYYY HH:MM:SS
 * @param complaints: Array of complaints to check from
 * 
 * @return An array of complaints whose dates fall within the given range
*/
export const getComplaintsWithinRange = (startDate: string, endDate: string, complaints: Complaint[]): Complaint[] => {
    // Convert the date strings into the format that can be parsed correctly
    const parseDate = (dateStr: string) => {
        const [day, month, year, hour, minute, second] = dateStr.split(/[-\s:]/);
        return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
    };

    const start = parseDate(startDate);
    const end = parseDate(endDate);

    return complaints.filter(complaint => {
        const complaintDate = parseDate(complaint.date);
        return complaintDate >= start && complaintDate <= end;
    });
};


/**
Randomly get a path from the possible collectible paths
*/
export const getRandomCollectible = () => {
    const randomIndex = Math.floor(Math.random() * POSSIBLE_COLLECTIBLE_PATHS.length);
    return POSSIBLE_COLLECTIBLE_PATHS[randomIndex];
};