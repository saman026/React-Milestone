// Actions

// Function for Setting invoices
export const setInvoices = (data) => ({
    type: 'SET_INVOICES',
    payload: data,
})

// Function for Setting the invoice details
export const addDetails = (data) => ({
    k:console.log(data, "daa"),
    type: 'ADD_DETAILS',
    payload: data,
})

// Function for Adding the invoice
export const addInvoice = (data) => ({
    k: console.log(data, "data"),
    type: "ADD_INVOICE",
    payload: data,  
});

// Function for Adding the details of selected row(s)
export const addSelected = (selected, number, edit) => ({
    k: console.log("number", selected,number, edit),
    type: "ADD_SELECTED",
    selected: selected,
    length: number,
    details: edit,
})

// Function for Editing the details of the invoice
export const editDetails = (formData) => ({
    type: "EDIT_DETAILS",
    payload: formData,
})

// Function for Editing the invoice
export const editInvoice = (formData) => ({
    type: "EDIT_INVOICE",
    payload: formData,
})

// Function for Deleting the invoice
export const deleteInvoice = (selected) => ({
    type: "DELETE_INVOICE",
    payload: selected[0],
})

// Function for Setting search parameter
export const handleSearchData = (data) => ({
    type: 'SET_SEARCH_DATA',
    payload: data,
})

// Function for Setting name_customer error
export const setErrorsName = (data) => ({
    type: "SET_ERROR_NAME",
    payload: data,
})

// Function for Setting cust_number error
export const setErrorsNumber = (data) => ({
    type: "SET_ERROR_NUMBER",
    payload: data,
})

// Function for Setting invoice_id error
export const setErrorsId = (data) => ({
    type: "SET_ERROR_ID",
    payload: data,
})

// Function for Setting total_open_amount error
export const setErrorsAmount = (data) => ({
    type: "SET_ERROR_AMOUNT",
    payload: data,
})

// Function for Setting due_in_date error
export const setErrorsDate = (data) => ({
    type: "SET_ERROR_DATE",
    payload: data,
})

export const setPrediction = (data) => ({
    type: "SET_PREDICTION",
    payload: data,
})