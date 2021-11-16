import React, { useState, createContext, useEffect } from "react";

export const FeedContext = createContext(null);

export const FeedProvider = ({ children }) => {
  const [feed, setFeed] = useState(null);
  const [publicFeed, setPublicFeed] = useState(null);
  const [trends, setTrends] = useState(null);
  const [whoFollow, setWhoFollow] = useState(null);

  return (
    <FeedContext.Provider
      value={{
        feed,
        setFeed,
        whoFollow,
        setWhoFollow,
        publicFeed,
        setPublicFeed,
        trends,
        setTrends,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

export default FeedProvider;
