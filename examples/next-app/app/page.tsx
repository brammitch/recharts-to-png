'use client';

import FileSaver from 'file-saver';
import type { NextPage } from 'next';
import { useCallback, useState } from 'react';
import {
  Area,
  Bar,
  Brush,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useCurrentPng, useGenerateImage } from '../../../dist';
import { getLgData, getLgPieData, getSmPieData } from '../utils';

const Home: NextPage = () => {
  // Pie chart setup
  const [data01] = useState(getSmPieData());
  const [data02] = useState(getLgPieData());
  const [getPiePng, { ref: pieRef }] = useCurrentPng();
  const handlePieCopyToClipboard = useCallback(async () => {
    // Pass in optional callback for canvas.toBlob
    await getPiePng((blob) => {
      blob &&
        navigator.clipboard.write([
          new ClipboardItem({
            // The key is determined dynamically based on the blob's type.
            [blob.type]: blob,
          }),
        ]);
    });
  }, [getPiePng]);

  // Composed chart setup
  const [composedData] = useState(getLgData(500));
  const [getComposedPng, { ref: composedRef, isLoading }] = useCurrentPng();
  const handleComposedDownload = useCallback(async () => {
    const png = await getComposedPng();
    if (png) {
      FileSaver.saveAs(png, 'composed-chart.png');
    }
  }, [getComposedPng]);

  // Test div
  const [getDivPng, { ref: divRef }] = useGenerateImage<HTMLDivElement>({
    quality: 0.8,
    type: 'image/jpeg',
  });
  const handleDivDownload = useCallback(async () => {
    const png = await getDivPng();
    if (png) {
      FileSaver.saveAs(png, 'div.png');
    }
  }, [getDivPng]);

  return (
    <div className="grid-container" ref={divRef}>
      <div className="download-all">
        <h4 style={{ textAlign: 'left' }}>
          <code>
            Example: useGenerateImage to target an HTMLDivElement and download the entire Div as a
            JPEG with 80% quality
          </code>
        </h4>
        <button onClick={handleDivDownload}>
          <code>Download All</code>
        </button>
      </div>
      <div className="pie-chart">
        <h4>
          <code>Example: useCurrentPng for Responsive Pie Chart</code>
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart ref={pieRef}>
            <Pie
              data={data01}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={50}
              fill="#8884d8"
            />
            <Pie
              data={data02}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#82ca9d"
              label
            />
          </PieChart>
        </ResponsiveContainer>
        <br />
        <button onClick={handlePieCopyToClipboard}>
          <code>Copy Pie Chart to Clipboard</code>
        </button>
      </div>
      <div className="composed-chart">
        <h4>
          <code>
            Example: useCurrentPng on large dataset, with isLoading for button state change
          </code>
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={composedData} ref={composedRef}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
            <Bar dataKey="pv" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="uv" stroke="#ff7300" />
            <Brush dataKey="name" height={30} stroke="#8884d8" />
          </ComposedChart>
        </ResponsiveContainer>
        <br />
        <button disabled={isLoading} onClick={handleComposedDownload}>
          {isLoading ? (
            <span className="download-button-content">
              <i className="gg-spinner" />
              <span className="download-button-text">
                <code>Downloading...</code>
              </span>
            </span>
          ) : (
            <span className="download-button-content">
              <i className="gg-software-download" />
              <span className="download-button-text">
                <code>Download Composed Chart</code>
              </span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Home;
