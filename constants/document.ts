export const DRAFT = "Draft";
export const INPROGRESS = "In progress";
export const COMPLETED = "Completed";
export const DECLINED = "Declined";

export const VIEWED = "Viewed";
export const SIGNED = "Signed";
export const SENT = "Sent";
export const CREATED = "Created";
export const UPDATED = "Updated";

export const DOCUMENT_ACTION = {
    created: CREATED,
    sent: SENT,
    viewed: VIEWED,
    signed: SIGNED,
    updated: UPDATED,
}

export const DOCUMENT_STATUS = {
    draft: DRAFT,
    inprogress: INPROGRESS,
    completed: COMPLETED,
    declined: DECLINED,
}

export const DEFAULT_EXP_DAY = 120;
export const DEFAULT_FIRST_REMIND_DAY = 1;
export const DEFAULT_REPEAT_REMIND_DAY = 1;