import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import FileSaver from 'file-saver';
import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { getPngData, RechartsChart, useRechartToPng } from '..';

export function App(): JSX.Element {
  // The chart that we want to download the PNG for.
  const [chart, setChart] = React.useState<RechartsChart>();

  const [png, ref] = useRechartToPng();

  const handleDownloadOld = React.useCallback(async () => {
    if (chart !== undefined) {
      // Send the chart to getPngData
      const pngData = await getPngData(chart);
      // Use FileSaver to download the PNG
      FileSaver.saveAs(pngData, 'test.png');
    }
  }, [chart]);

  const handleDownloadNew = React.useCallback(() => {
    if (typeof png === 'string') {
      FileSaver.saveAs(png, 'test.png');
    }
  }, [png]);

  const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <div id="container">
      <h2>getPngData example with FileSaver</h2>
      <br />
      <LineChart
        ref={(lineChartRef): void => setChart(lineChartRef as LineChart)} // Save the ref of the chart
        data={data}
        height={300}
        width={600}
        margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend wrapperStyle={{ bottom: 0 }} />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
      <span style={{ float: 'left' }}>
        <button onClick={handleDownloadOld}>Download</button>
      </span>
      <br />
      <h2>useRechartToPng example with FileSaver</h2>
      <br />
      <LineChart
        ref={ref} // Save the ref of the chart
        data={data}
        height={300}
        width={600}
        margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend wrapperStyle={{ bottom: 0 }} />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
      <span style={{ float: 'left' }}>
        <button data-testid="download-button" onClick={handleDownloadNew}>
          Download
        </button>
      </span>
    </div>
  );
}

// Mocks
jest.mock('file-saver', () => ({ saveAs: jest.fn() }));
jest.mock('html2canvas', () => jest.fn().mockResolvedValue({ toDataURL: jest.fn() }));

describe('useRechartToPng', () => {
  beforeAll(() => {
    window.scrollTo = jest.fn();
    // window.getComputedStyle = () => ({
    //   alignContent: '',
    //   alignItems: 'string',
    //   alignSelf: 'string',
    //   alignmentBaseline: 'string',
    //   all: 'string',
    //   animation: 'string',
    //   animationDelay: 'string',
    //   animationDirection: 'string',
    //   animationDuration: 'string',
    //   animationFillMode: 'string',
    //   animationIterationCount: 'string',
    //   animationName: 'string',
    //   animationPlayState: 'string',
    //   animationTimingFunction: 'string',
    //   backfaceVisibility: 'string',
    //   background: 'string',
    //   backgroundAttachment: 'string',
    //   backgroundClip: 'string',
    //   backgroundColor: 'string',
    //   backgroundImage: 'string',
    //   backgroundOrigin: 'string',
    //   backgroundPosition: 'string',
    //   backgroundPositionX: 'string',
    //   backgroundPositionY: 'string',
    //   backgroundRepeat: 'string',
    //   backgroundSize: 'string',
    //   baselineShift: 'string',
    //   blockSize: 'string',
    //   border: 'string',
    //   borderBlockEnd: 'string',
    //   borderBlockEndColor: 'string',
    //   borderBlockEndStyle: 'string',
    //   borderBlockEndWidth: 'string',
    //   borderBlockStart: 'string',
    //   borderBlockStartColor: 'string',
    //   borderBlockStartStyle: 'string',
    //   borderBlockStartWidth: 'string',
    //   borderBottom: 'string',
    //   borderBottomColor: 'string',
    //   borderBottomLeftRadius: 'string',
    //   borderBottomRightRadius: 'string',
    //   borderBottomStyle: 'string',
    //   borderBottomWidth: 'string',
    //   borderCollapse: 'string',
    //   borderColor: 'string',
    //   borderImage: 'string',
    //   borderImageOutset: 'string',
    //   borderImageRepeat: 'string',
    //   borderImageSlice: 'string',
    //   borderImageSource: 'string',
    //   borderImageWidth: 'string',
    //   borderInlineEnd: 'string',
    //   borderInlineEndColor: 'string',
    //   borderInlineEndStyle: 'string',
    //   borderInlineEndWidth: 'string',
    //   borderInlineStart: 'string',
    //   borderInlineStartColor: 'string',
    //   borderInlineStartStyle: 'string',
    //   borderInlineStartWidth: 'string',
    //   borderLeft: 'string',
    //   borderLeftColor: 'string',
    //   borderLeftStyle: 'string',
    //   borderLeftWidth: 'string',
    //   borderRadius: 'string',
    //   borderRight: 'string',
    //   borderRightColor: 'string',
    //   borderRightStyle: 'string',
    //   borderRightWidth: 'string',
    //   borderSpacing: 'string',
    //   borderStyle: 'string',
    //   borderTop: 'string',
    //   borderTopColor: 'string',
    //   borderTopLeftRadius: 'string',
    //   borderTopRightRadius: 'string',
    //   borderTopStyle: 'string',
    //   borderTopWidth: 'string',
    //   borderWidth: 'string',
    //   bottom: 'string',
    //   boxShadow: 'string',
    //   boxSizing: 'string',
    //   breakAfter: 'string',
    //   breakBefore: 'string',
    //   breakInside: 'string',
    //   captionSide: 'string',
    //   caretColor: 'string',
    //   clear: 'string',
    //   clip: 'string',
    //   clipPath: 'string',
    //   clipRule: 'string',
    //   color: 'string',
    //   colorInterpolation: 'string',
    //   colorInterpolationFilters: 'string',
    //   columnCount: 'string',
    //   columnFill: 'string',
    //   columnGap: 'string',
    //   columnRule: 'string',
    //   columnRuleColor: 'string',
    //   columnRuleStyle: 'string',
    //   columnRuleWidth: 'string',
    //   columnSpan: 'string',
    //   columnWidth: 'string',
    //   columns: 'string',
    //   content: 'string',
    //   counterIncrement: 'string',
    //   counterReset: 'string',
    //   cssFloat: 'string',
    //   cssText: 'string',
    //   cursor: 'string',
    //   direction: 'string',
    //   display: 'string',
    //   dominantBaseline: 'string',
    //   emptyCells: 'string',
    //   fill: 'string',
    //   fillOpacity: 'string',
    //   fillRule: 'string',
    //   filter: 'string',
    //   flex: 'string',
    //   flexBasis: 'string',
    //   flexDirection: 'string',
    //   flexFlow: 'string',
    //   flexGrow: 'string',
    //   flexShrink: 'string',
    //   flexWrap: 'string',
    //   float: 'string',
    //   floodColor: 'string',
    //   floodOpacity: 'string',
    //   font: 'string',
    //   fontFamily: 'string',
    //   fontFeatureSettings: 'string',
    //   fontKerning: 'string',
    //   fontSize: 'string',
    //   fontSizeAdjust: 'string',
    //   fontStretch: 'string',
    //   fontStyle: 'string',
    //   fontSynthesis: 'string',
    //   fontVariant: 'string',
    //   fontVariantCaps: 'string',
    //   fontVariantEastAsian: 'string',
    //   fontVariantLigatures: 'string',
    //   fontVariantNumeric: 'string',
    //   fontVariantPosition: 'string',
    //   fontWeight: 'string',
    //   gap: 'string',
    //   glyphOrientationVertical: 'string',
    //   grid: 'string',
    //   gridArea: 'string',
    //   gridAutoColumns: 'string',
    //   gridAutoFlow: 'string',
    //   gridAutoRows: 'string',
    //   gridColumn: 'string',
    //   gridColumnEnd: 'string',
    //   gridColumnGap: 'string',
    //   gridColumnStart: 'string',
    //   gridGap: 'string',
    //   gridRow: 'string',
    //   gridRowEnd: 'string',
    //   gridRowGap: 'string',
    //   gridRowStart: 'string',
    //   gridTemplate: 'string',
    //   gridTemplateAreas: 'string',
    //   gridTemplateColumns: 'string',
    //   gridTemplateRows: 'string',
    //   height: 'string',
    //   hyphens: 'string',
    //   imageOrientation: 'string',
    //   imageRendering: 'string',
    //   inlineSize: 'string',
    //   justifyContent: 'string',
    //   justifyItems: 'string',
    //   justifySelf: 'string',
    //   left: 'string',
    //   length: 10,
    //   letterSpacing: 'string',
    //   lightingColor: 'string',
    //   lineBreak: 'string',
    //   lineHeight: 'string',
    //   listStyle: 'string',
    //   listStyleImage: 'string',
    //   listStylePosition: 'string',
    //   listStyleType: 'string',
    //   margin: 'string',
    //   marginBlockEnd: 'string',
    //   marginBlockStart: 'string',
    //   marginBottom: 'string',
    //   marginInlineEnd: 'string',
    //   marginInlineStart: 'string',
    //   marginLeft: 'string',
    //   marginRight: 'string',
    //   marginTop: 'string',
    //   marker: 'string',
    //   markerEnd: 'string',
    //   markerMid: 'string',
    //   markerStart: 'string',
    //   mask: 'string',
    //   maskComposite: 'string',
    //   maskImage: 'string',
    //   maskPosition: 'string',
    //   maskRepeat: 'string',
    //   maskSize: 'string',
    //   maskType: 'string',
    //   maxBlockSize: 'string',
    //   maxHeight: 'string',
    //   maxInlineSize: 'string',
    //   maxWidth: 'string',
    //   minBlockSize: 'string',
    //   minHeight: 'string',
    //   minInlineSize: 'string',
    //   minWidth: 'string',
    //   objectFit: 'string',
    //   objectPosition: 'string',
    //   opacity: 'string',
    //   order: 'string',
    //   orphans: 'string',
    //   outline: 'string',
    //   outlineColor: 'string',
    //   outlineOffset: 'string',
    //   outlineStyle: 'string',
    //   outlineWidth: 'string',
    //   overflow: 'string',
    //   overflowAnchor: 'string',
    //   overflowWrap: 'string',
    //   overflowX: 'string',
    //   overflowY: 'string',
    //   overscrollBehavior: 'string',
    //   overscrollBehaviorBlock: 'string',
    //   overscrollBehaviorInline: 'string',
    //   overscrollBehaviorX: 'string',
    //   overscrollBehaviorY: 'string',
    //   padding: 'string',
    //   paddingBlockEnd: 'string',
    //   paddingBlockStart: 'string',
    //   paddingBottom: 'string',
    //   paddingInlineEnd: 'string',
    //   paddingInlineStart: 'string',
    //   paddingLeft: 'string',
    //   paddingRight: 'string',
    //   paddingTop: 'string',
    //   pageBreakAfter: 'string',
    //   pageBreakBefore: 'string',
    //   pageBreakInside: 'string',
    //   paintOrder: 'string',
    //   parentRule: null,
    //   perspective: 'string',
    //   perspectiveOrigin: 'string',
    //   placeContent: 'string',
    //   placeItems: 'string',
    //   placeSelf: 'string',
    //   pointerEvents: 'string',
    //   position: 'string',
    //   quotes: 'string',
    //   resize: 'string',
    //   right: 'string',
    //   rotate: 'string',
    //   rowGap: 'string',
    //   rubyAlign: 'string',
    //   rubyPosition: 'string',
    //   scale: 'string',
    //   scrollBehavior: 'string',
    //   shapeRendering: 'string',
    //   stopColor: 'string',
    //   stopOpacity: 'string',
    //   stroke: 'string',
    //   strokeDasharray: 'string',
    //   strokeDashoffset: 'string',
    //   strokeLinecap: 'string',
    //   strokeLinejoin: 'string',
    //   strokeMiterlimit: 'string',
    //   strokeOpacity: 'string',
    //   strokeWidth: 'string',
    //   tabSize: 'string',
    //   tableLayout: 'string',
    //   textAlign: 'string',
    //   textAlignLast: 'string',
    //   textAnchor: 'string',
    //   textCombineUpright: 'string',
    //   textDecoration: 'string',
    //   textDecorationColor: 'string',
    //   textDecorationLine: 'string',
    //   textDecorationStyle: 'string',
    //   textEmphasis: 'string',
    //   textEmphasisColor: 'string',
    //   textEmphasisPosition: 'string',
    //   textEmphasisStyle: 'string',
    //   textIndent: 'string',
    //   textJustify: 'string',
    //   textOrientation: 'string',
    //   textOverflow: 'string',
    //   textRendering: 'string',
    //   textShadow: 'string',
    //   textTransform: 'string',
    //   textUnderlinePosition: 'string',
    //   top: 'string',
    //   touchAction: 'string',
    //   transform: 'string',
    //   transformBox: 'string',
    //   transformOrigin: 'string',
    //   transformStyle: 'string',
    //   transition: 'string',
    //   transitionDelay: 'string',
    //   transitionDuration: 'string',
    //   transitionProperty: 'string',
    //   transitionTimingFunction: 'string',
    //   translate: 'string',
    //   unicodeBidi: 'string',
    //   userSelect: 'string',
    //   verticalAlign: 'string',
    //   visibility: 'string',
    //   /** @deprecated */
    //   webkitAlignContent: 'string',
    //   /** @deprecated */
    //   webkitAlignItems: 'string',
    //   /** @deprecated */
    //   webkitAlignSelf: 'string',
    //   /** @deprecated */
    //   webkitAnimation: 'string',
    //   /** @deprecated */
    //   webkitAnimationDelay: 'string',
    //   /** @deprecated */
    //   webkitAnimationDirection: 'string',
    //   /** @deprecated */
    //   webkitAnimationDuration: 'string',
    //   /** @deprecated */
    //   webkitAnimationFillMode: 'string',
    //   /** @deprecated */
    //   webkitAnimationIterationCount: 'string',
    //   /** @deprecated */
    //   webkitAnimationName: 'string',
    //   /** @deprecated */
    //   webkitAnimationPlayState: 'string',
    //   /** @deprecated */
    //   webkitAnimationTimingFunction: 'string',
    //   /** @deprecated */
    //   webkitAppearance: 'string',
    //   /** @deprecated */
    //   webkitBackfaceVisibility: 'string',
    //   /** @deprecated */
    //   webkitBackgroundClip: 'string',
    //   /** @deprecated */
    //   webkitBackgroundOrigin: 'string',
    //   /** @deprecated */
    //   webkitBackgroundSize: 'string',
    //   /** @deprecated */
    //   webkitBorderBottomLeftRadius: 'string',
    //   /** @deprecated */
    //   webkitBorderBottomRightRadius: 'string',
    //   /** @deprecated */
    //   webkitBorderRadius: 'string',
    //   /** @deprecated */
    //   webkitBorderTopLeftRadius: 'string',
    //   /** @deprecated */
    //   webkitBorderTopRightRadius: 'string',
    //   /** @deprecated */
    //   webkitBoxAlign: 'string',
    //   /** @deprecated */
    //   webkitBoxFlex: 'string',
    //   /** @deprecated */
    //   webkitBoxOrdinalGroup: 'string',
    //   /** @deprecated */
    //   webkitBoxOrient: 'string',
    //   /** @deprecated */
    //   webkitBoxPack: 'string',
    //   /** @deprecated */
    //   webkitBoxShadow: 'string',
    //   /** @deprecated */
    //   webkitBoxSizing: 'string',
    //   /** @deprecated */
    //   webkitFilter: 'string',
    //   /** @deprecated */
    //   webkitFlex: 'string',
    //   /** @deprecated */
    //   webkitFlexBasis: 'string',
    //   /** @deprecated */
    //   webkitFlexDirection: 'string',
    //   /** @deprecated */
    //   webkitFlexFlow: 'string',
    //   /** @deprecated */
    //   webkitFlexGrow: 'string',
    //   /** @deprecated */
    //   webkitFlexShrink: 'string',
    //   /** @deprecated */
    //   webkitFlexWrap: 'string',
    //   /** @deprecated */
    //   webkitJustifyContent: 'string',
    //   webkitLineClamp: 'string',
    //   /** @deprecated */
    //   webkitMask: 'string',
    //   /** @deprecated */
    //   webkitMaskBoxImage: 'string',
    //   /** @deprecated */
    //   webkitMaskBoxImageOutset: 'string',
    //   /** @deprecated */
    //   webkitMaskBoxImageRepeat: 'string',
    //   /** @deprecated */
    //   webkitMaskBoxImageSlice: 'string',
    //   /** @deprecated */
    //   webkitMaskBoxImageSource: 'string',
    //   /** @deprecated */
    //   webkitMaskBoxImageWidth: 'string',
    //   /** @deprecated */
    //   webkitMaskClip: 'string',
    //   /** @deprecated */
    //   webkitMaskComposite: 'string',
    //   /** @deprecated */
    //   webkitMaskImage: 'string',
    //   /** @deprecated */
    //   webkitMaskOrigin: 'string',
    //   /** @deprecated */
    //   webkitMaskPosition: 'string',
    //   /** @deprecated */
    //   webkitMaskRepeat: 'string',
    //   /** @deprecated */
    //   webkitMaskSize: 'string',
    //   /** @deprecated */
    //   webkitOrder: 'string',
    //   /** @deprecated */
    //   webkitPerspective: 'string',
    //   /** @deprecated */
    //   webkitPerspectiveOrigin: 'string',
    //   webkitTapHighlightColor: 'string',
    //   /** @deprecated */
    //   webkitTextFillColor: 'string',
    //   /** @deprecated */
    //   webkitTextSizeAdjust: 'string',
    //   /** @deprecated */
    //   webkitTextStroke: 'string',
    //   /** @deprecated */
    //   webkitTextStrokeColor: 'string',
    //   /** @deprecated */
    //   webkitTextStrokeWidth: 'string',
    //   /** @deprecated */
    //   webkitTransform: 'string',
    //   /** @deprecated */
    //   webkitTransformOrigin: 'string',
    //   /** @deprecated */
    //   webkitTransformStyle: 'string',
    //   /** @deprecated */
    //   webkitTransition: 'string',
    //   /** @deprecated */
    //   webkitTransitionDelay: 'string',
    //   /** @deprecated */
    //   webkitTransitionDuration: 'string',
    //   /** @deprecated */
    //   webkitTransitionProperty: 'string',
    //   /** @deprecated */
    //   webkitTransitionTimingFunction: 'string',
    //   /** @deprecated */
    //   webkitUserSelect: 'string',
    //   whiteSpace: 'string',
    //   widows: 'string',
    //   width: 'string',
    //   willChange: 'string',
    //   wordBreak: 'string',
    //   wordSpacing: 'string',
    //   wordWrap: 'string',
    //   writingMode: 'string',
    //   zIndex: 'string',
    //   /** @deprecated */
    //   zoom: 'string',
    //   getPropertyPriority: jest.fn(),
    //   getPropertyValue: jest.fn(),
    //   item: jest.fn(),
    //   removeProperty: jest.fn(),
    //   setProperty: jest.fn(),
    //   [Symbol.iterator]: jest.fn(),
    // });
  });

  test('Downloads PNG', async () => {
    render(<App />);
    const downloadButton = await screen.findByTestId('download-button');
    fireEvent.click(downloadButton);
    waitFor(() => expect(FileSaver.saveAs).toHaveBeenCalledWith('', 'test.png'));
  });

  afterAll(() => jest.clearAllMocks());
});
