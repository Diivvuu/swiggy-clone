import React from "react";
import { shimmer_display_count } from "../helpers/Constant";

const HomeShimmer = () => {
  const shimArr = Array(shimmer_display_count).fill("");
  return (
    <div className="xl:max-w-[80%] lg:max-w-[80%] md:max-w-[90%] sm:max-w-[90%] mx-auto min-h-screen pt-24">
      <div className="mt-8 mb-4 ml-4 pl-2 max-w-[40%] bg-[#eef0f5] h-6" />
      <div className="flex p-4 overflow-hidden">
        {shimArr.map((e, i) => {
          return (
            <div
              className="h-[180px] min-w-[144px] bg-[#eef0f5] mr-8"
              key={i}
            />
          );
        })}
      </div>
      <div className="mt-8 mb-4 ml-4 pl-2 max-w-[40%] bg-[#eef0f5] h-6" />
      <div className="flex p-4 overflow-hidden">
        {shimArr.map((e, i) => {
          return (
            <div
              className="h-64 min-w-[424px] bg-[#eef0f5] mr-8 rounded-3xl"
              key={i}
            />
          );
        })}
      </div>
      <div className="mt-8 ml-4 pl-2 max-w-[40%] bg-[#eef0f5] h-6" />
      <div className="flex mt-8 ml-4 pl-2 overflow-hidden min-h-[240px]">
        {shimArr.map((e, i) => {
          return (
            <div
              className="h-[160px] min-w-[256px] rounded-3xl bg-[#eef0f5] mr-8"
              key={i}
            />
          );
        })}
      </div>
      <div className="mt-8 ml-4 pl-2 max-w-[40%] bg-[#eef0f5] h-6" />
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-8 ml-4 gap-y-8 overflow-hidden min-h-[240px]">
        {shimArr.map((e, i) => {
          return (
            <div
              className="h-[160px] min-w-[256px] max-w-[256px] rounded-3xl bg-[#eef0f5] mr-8"
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomeShimmer;
