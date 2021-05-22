// Defining the initial state
const initialState = {
  invoices: [],
  selected: [],
  prediction: [],
  name_customer: "",
  cust_number: "",
  invoice_id: "",
  total_open_amount: "",
  due_in_date: "",
  notes: "",
  number: "",
  details: "",
  searchData: "",
  error_customer_name: false,
  error_cust_number: false,
  error_invoice_id: false,
  error_total_open_amount: false,
  error_due_in_date: false,
};


const reducerFunction = (state = initialState, action) => {
  
  switch (action.type) {
      
    // Setting the invoices
    case "SET_INVOICES":
      return {
        ...state,
        invoices: action.payload,
      }
    
    // Adding the details of the invoice that is to be inserted
    case "ADD_DETAILS":
      return {
        ...state,
        name_customer: action.payload.name_customer,
        cust_number: action.payload.cust_number,
        invoice_id: action.payload.invoice_id,
        total_open_amount: action.payload.total_open_amount,
        due_in_date: action.payload.due_in_date,
        notes: action.payload.notes,
      }
    
    // Adding the invoice
    case "ADD_INVOICE":
      return {
        ...state,
        invoices: [action.payload, ...state.invoices],
      };    
      
    // Adding selected row(s) details
    case "ADD_SELECTED":
        return {
          ...state,
          selected: action.selected,
          number: action.length,
          details: action.details,
      }
    
    // Adding the edited details of the invoice
    case "EDIT_DETAILS":
      return {
        ...state,
        total_open_amount: action.payload.total_open_amount,
        notes: action.payload.notes,
      }
    
    // Editing the invoice
    case "EDIT_INVOICE":     
      return {   
        ...state,
        invoices: state.invoices.map((invoice) => {           
          return invoice.doc_id === action.payload.doc_id ? { ...invoice, notes: action.payload.notes, total_open_amount: action.payload.total_open_amount } : invoice
        }),    
      };
    
    // Deleting the invoice
    case 'DELETE_INVOICE':
      return {          
        ...state,
        invoices: state.invoices.filter((invoice) => {
          return invoice.doc_id !== action.payload
        }),
      };
    
    // Setting the search parameter
    case "SET_SEARCH_DATA": 
      return {   
        ...state,
        searchData: action.payload,  
      }
    
    // Setting name_customer error
    case "SET_ERROR_NAME":
      return {
        ...state,
        error_customer_name: action.payload,
      };
    
    // Setting cust_number error
    case "SET_ERROR_NUMBER":
      return {  
        ...state,
        error_cust_number: action.payload,  
      }
    
    // Setting invoice_id error
    case "SET_ERROR_ID":
      return {
        ...state,
        error_invoice_id: action.payload,
      }
    
    // Setting total_open_amount error
    case "SET_ERROR_AMOUNT":
      return {
        ...state,
        error_total_open_amount: action.payload,
      };
    
    // Setting due_in_date error
    case "SET_ERROR_DATE":
      return {
        ...state,
        error_due_in_date: action.payload
      }
    case "SET_PREDICTION":
      return {
        ...state,
        prediction: action.payload 
      }
    
    default:
      return state;
  }
};


export default reducerFunction;