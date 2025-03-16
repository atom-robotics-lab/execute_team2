import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

// Analytics data
const analyticsData = {
  categories: [
    { name: "Political", count: 45, avgSpread: 75 },
    { name: "Health", count: 32, avgSpread: 60 },
    { name: "Science", count: 28, avgSpread: 55 },
    { name: "Technology", count: 20, avgSpread: 45 },
    { name: "Social", count: 15, avgSpread: 40 }
  ],
  trends: [
    { date: "2024-03-10", count: 10 },
    { date: "2024-03-11", count: 15 },
    { date: "2024-03-12", count: 12 },
    { date: "2024-03-13", count: 20 },
    { date: "2024-03-14", count: 25 },
    { date: "2024-03-15", count: 30 },
    { date: "2024-03-16", count: 35 }
  ]
};

export function AnalyticsChart() {
  const chartRef = useRef<SVGSVGElement>(null);
  const trendChartRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const width = 600;
      const height = 300;
      const margin = { top: 20, right: 30, bottom: 40, left: 60 };

      const svg = d3.select(chartRef.current)
        .attr('width', width)
        .attr('height', height);

      svg.selectAll("*").remove();

      const x = d3.scaleBand()
        .domain(analyticsData.categories.map(d => d.name))
        .range([margin.left, width - margin.right])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height - margin.bottom, margin.top]);

      // Add bars
      svg.selectAll("rect")
        .data(analyticsData.categories)
        .join("rect")
        .attr("x", d => x(d.name)!)
        .attr("y", d => y(d.avgSpread))
        .attr("width", x.bandwidth())
        .attr("height", d => height - margin.bottom - y(d.avgSpread))
        .attr("fill", "#ef4444")
        .attr("opacity", 0.7);

      // Add labels
      svg.selectAll(".bar-label")
        .data(analyticsData.categories)
        .join("text")
        .attr("class", "bar-label")
        .attr("x", d => x(d.name)! + x.bandwidth() / 2)
        .attr("y", d => y(d.avgSpread) - 5)
        .attr("text-anchor", "middle")
        .text(d => `${d.avgSpread}%`);

      // Add axes
      svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

      svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(5).tickFormat(d => d + "%"));

      // Add title
      svg.append("text")
        .attr("x", width / 2)
        .attr("y", margin.top)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Average Spread by Category");
    }

    // Trend Chart
    if (trendChartRef.current) {
      const width = 600;
      const height = 200;
      const margin = { top: 20, right: 30, bottom: 40, left: 60 };

      const svg = d3.select(trendChartRef.current)
        .attr('width', width)
        .attr('height', height);

      svg.selectAll("*").remove();

      const x = d3.scaleTime()
        .domain(d3.extent(analyticsData.trends, d => new Date(d.date)) as [Date, Date])
        .range([margin.left, width - margin.right]);

      const y = d3.scaleLinear()
        .domain([0, d3.max(analyticsData.trends, d => d.count)!])
        .range([height - margin.bottom, margin.top]);

      // Add line
      const line = d3.line<typeof analyticsData.trends[0]>()
        .x(d => x(new Date(d.date)))
        .y(d => y(d.count));

      svg.append("path")
        .datum(analyticsData.trends)
        .attr("fill", "none")
        .attr("stroke", "#ef4444")
        .attr("stroke-width", 2)
        .attr("d", line);

      // Add dots
      svg.selectAll("circle")
        .data(analyticsData.trends)
        .join("circle")
        .attr("cx", d => x(new Date(d.date)))
        .attr("cy", d => y(d.count))
        .attr("r", 4)
        .attr("fill", "#ef4444");

      // Add axes
      svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(7).tickFormat(d3.timeFormat("%b %d") as any));

      svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(5));

      // Add title
      svg.append("text")
        .attr("x", width / 2)
        .attr("y", margin.top)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Daily Misinformation Trends");
    }
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Total Stories</h3>
          <p className="text-3xl font-bold text-red-600">140</p>
          <p className="text-sm text-gray-500">Last 7 days</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Average Spread</h3>
          <p className="text-3xl font-bold text-red-600">55%</p>
          <p className="text-sm text-gray-500">Across all categories</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Most Active Region</h3>
          <p className="text-3xl font-bold text-red-600">North America</p>
          <p className="text-sm text-gray-500">45% of total stories</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <svg ref={chartRef}></svg>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <svg ref={trendChartRef}></svg>
      </div>
    </div>
  );
} 