const axios = require("axios");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendData = require("../utils/sendData");
const NewsList = require("../model/CricNewsListModel");
const ApiFeatures = require("../utils/ApiFeatures");

exports.getCricketNews = catchAsyncError(async (req, res, next) => {
  //   const options = {
  //     method: "GET",
  //     url: "https://cricbuzz-cricket.p.rapidapi.com/news/v1/index",
  //     headers: {
  //       "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
  //       "x-rapidapi-key": "6c981f0ca1msh3ddfb8ae4957d48p15c5cdjsnb3fb81b1cd3d",
  //     },
  //   };
  //   axios.request(options).then(async (response) => {
  //     const newsArray = response.data.storyList
  //       .filter((element) => element.story)
  //       .map((element) => {
  //         return {
  //           cbId: element.story.id,
  //           hline: element.story.hline,
  //           intro: element.story.intro,
  //           pubTime: element.story.pubTime,
  //           source: element.story.source,
  //           storyType: element.story.storyType,
  //           cbimageId: element.story.imageId,
  //           seoHeadline: element.story.seoHeadline,
  //           context: element.story.context,
  //           coverImage: {
  //             cbId: element.story.coverImage.id,
  //             caption: element.story.coverImage.caption,
  //             source: element.story.coverImage.source,
  //           },
  //         };
  //       });
  //     if (newsArray.length > 0) {
  //       await NewsList.insertMany(newsArray);
  //     } else {
  //       return next(new ErrorHandler("No news articles to insert.", 400));
  //     }
  //   });

  const resultPerPage = 10;
  const newsCount = (await NewsList.countDocuments()) - 1;
  const apiFeature = new ApiFeatures(NewsList.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  let newses = await apiFeature.query;
  const data = {
    news: newses,
    resultPerPage,
    newsCount,
  };
  sendData(data, 200, res, "Users found successfully");
});
