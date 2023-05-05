import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';

import QuoteForm from "../components/quotes/QuoteForm";

const NewQuote = () => {
  const {sendRequest, status } = useHttp(addQuote);
  const navigate = useNavigate();

  useEffect(() => {
    if(status === 'completed') {
      navigate('/quotes', { replace: true });
    }
  }, [status, navigate]); 

  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
    console.log(quoteData);

    //navigate('/quotes', { replace: true });
    //navigate("/quotes");
  };
  return <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />;
};

export default NewQuote;
