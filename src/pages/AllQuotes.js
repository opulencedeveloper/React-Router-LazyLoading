import { useEffect } from "react";

import useHttp from "../hooks/use-http";

import QuoteList from "../components/quotes/QuoteList";
import NoQuotesFound from '../components/quotes/NoQuotesFound';

import { getAllQuotes } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NewQuote from "./NewQuote";

// const DUMMY_QUOTES = [
//   { id: "q1", author: "Victor", text: "This is the text1 Victor" },
//   { id: "q2", author: "Opulence", text: "This is the text2 Opulence!" },
// ];

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if(status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />
  }

  return <QuoteList quotes={loadedQuotes} />;
};

export default AllQuotes;
