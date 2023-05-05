import { useEffect } from "react";

import { useParams, Route, Routes, Link, useLocation } from "react-router-dom";

import useHttp from "../hooks/use-http";

import { getSingleQuote } from "../lib/api";

import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";

// const DUMMY_QUOTES = [
//   { id: "q1", author: "Victor", text: "This is the text1 Victor" },
//   { id: "q2", author: "Opulence", text: "This is the text2 Opulence!" },
// ];

const QuoteDetail = () => {
  const params = useParams();
  const location = useLocation();


  const { quoteId } = params;

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  //const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p>No quote found!</p>;
  }

  return (
    <>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      {location.pathname === `/quotes/${params.quoteId}` && (
        <div className="centered">
          <Link className="btn--flat" to={`${location.pathname}/comments`}>
            Load Comments
          </Link>
        </div>
      )}
      <Routes>
        <Route path="comments" element={<Comments />} />{" "}
      </Routes>
    </>
  );
};

export default QuoteDetail;
