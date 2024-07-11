import React from "react";
import { AuthContext } from "../Store";
import { getDataFromApi } from "../api/CustomApiCall";
import { ApiMethods } from "../enum/ApiMethods";
import { Typography } from "@mui/material";

const Home = () => {
  const context = React.useContext(AuthContext);
  const [news, setNews] = React.useState([]);
  const [totalPage, setTotalPage] = React.useState(0);

  const getNews = async (searchKeyWord: string, page: number) => {
    context.setLoading(true);
    const data = await getDataFromApi("/api/v1/cricketNews", ApiMethods.GET, {
      keyword: searchKeyWord,
      page: page,
    });
    if (data.success && data.data) {
      setNews(data.data.news);
      setTotalPage(Math.ceil(data.data.newsCount / data.data.resultPerPage));
    }
    context.setLoading(false);
  };

  React.useEffect(() => {
    getNews("", 1);
  }, []);

  console.log(news);
  return (
    <React.Fragment>
      {news.map((item: any, index: number) => {
        return <Typography key={index}>{item.hline ?? ""}</Typography>;
      })}
    </React.Fragment>
  );
};

export default Home;
