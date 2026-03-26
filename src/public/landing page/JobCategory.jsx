import React, { useRef } from 'react';

const JobCategory = () => {
  const categories = [
    { title: "Digital Marketing", openings: 50, icon: "/category/Digital Marketing.png" },
    { title: "Sales", openings: 90, icon: "/category/Sales.png" },
    { title: "UI/UX Designer", openings: 50, icon: "/category/UI-UX Designer.png" },
    { title: "Finance", openings: 40, icon: "/category/Finance.png" },
    { title: "Web Developer", openings: 50, icon: "/category/Web Developer.png" },
    { title: "Content Writing", openings: 50, icon: "/category/Content Writing.png" },
    { title: "Data Analyst", openings: 60, icon: "/category/Content Writing.png" },
  ];

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Section Title */}
      <div className="mt-10"></div>
      <h3 className="text-3xl font-bold text-primary-500 mb-10 text-center">
        Explore More Opportunities
      </h3>

      {/* Carousel Container */}
      <div className="relative">
        {/* Left Button */}
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-full p-2 shadow-sm hover:shadow-md transition border border-slate-200 dark:border-slate-700"
        >
          ‹
        </button>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          className="overflow-x-auto whitespace-nowrap pb-6 snap-x snap-mandatory px-4 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-6 min-w-max">
            {categories.map((category, index) => (
              <div
                key={category.title + index}
                className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition duration-300 inline-block rounded-xl shadow-sm hover:shadow-md p-6 cursor-pointer border border-slate-200 dark:border-slate-700"
                style={{
                  width: '200px',
                  height: '240px',
                  textAlign: 'center',
                }}
              >
                <div className="flex justify-center mb-4">
                  <img src={category.icon} alt={category.title} className="w-10 h-10" />
                </div>

                <p className="font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {category.title}
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-400 font-semibold">
                  {category.openings}+ openings
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Button */}
        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-full p-2 shadow-sm hover:shadow-md transition border border-slate-200 dark:border-slate-700"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default JobCategory;
